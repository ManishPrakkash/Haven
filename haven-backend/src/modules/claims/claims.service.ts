import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SupabaseService } from '../../supabase/supabase.service';
import { WeatherService } from '../weather/weather.service';
import { H3Service } from '../../h3/h3.service';
import { PayoutService } from '../payout/payout.service';
import { RedisService } from '../../redis/redis.service';
import { TelemetryService } from '../telemetry/telemetry.service';
import * as h3 from 'h3-js';
import { CreateClaimDto } from './dto/create-claim.dto';
import { CLAIMS_QUEUE, PROCESS_CLAIM_JOB } from './constants';
import { SimulationPayload } from '../triggers/triggers.controller';

@Injectable()
export class ClaimsService {
  private readonly logger = new Logger(ClaimsService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly weatherService: WeatherService,
    private readonly h3Service: H3Service,
    private readonly payoutService: PayoutService,
    private readonly redisService: RedisService,
    private readonly telemetryService: TelemetryService,
    private readonly configService: ConfigService,
    @InjectQueue(CLAIMS_QUEUE) private readonly claimsQueue: Queue,
  ) {}

  /**
   * Public API to submit a claim. Enqueues for background processing.
   */
  async processClaim(dto: CreateClaimDto): Promise<void> {
    this.logger.log(`Enqueuing claim for policy ${dto.policy_id}`);
    await this.claimsQueue.add(PROCESS_CLAIM_JOB, dto, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }

  /**
   * The 3-Layer Simulator Fraud Pipeline.
   * This is triggered by Swiggy Mock "SIMULATE" buttons.
   */
  async processSimulation(payload: SimulationPayload): Promise<any> {
    // LAYER 0: IDEMPOTENCY & CONCURRENCY (10+ Year Developer Grid)
    const timeBucket = new Date().toISOString().substring(0, 13); // Hourly bucket
    const lockKey = `claim:lock:${payload.workerId}:${payload.eventType}:${timeBucket}`;
    const acquired = await this.redisService.acquireLock(lockKey, 60000); // 1-minute lock
    
    if (!acquired) {
      this.logger.warn(`Duplicate trigger detected for worker ${payload.workerId}. Aborting.`);
      return { status: 'DENIED', reason: 'Conflict: Claim already being processed.', layer: 0 };
    }

    try {
      this.logger.log(`Executing 3-Layer Fraud Engine for Simulator: ${payload.workerId}`);
    
    // FETCH THE ACTIVE POLICY FOR THIS WORKER
    const { data: policy } = await this.supabaseService.client
      .from('policies')
      .select('id, created_at, plan_type, status')
      .eq('user_id', payload.workerId)
      .eq('status', 'ACTIVE')
      .maybeSingle();

    if (!policy) {
      this.logger.error(`[Layer 1] FRAUD BLOCKED. No active policy found for worker ${payload.workerId}.`);
      return { status: 'DENIED', reason: 'No active policy found.', layer: 1 };
    }

    // LAYER 1: VETO CHECKS (Wait Period)
    const createdAt = new Date(policy.created_at).getTime();
    const waitHours = policy.plan_type === 'PRO' ? 72 : 168; // 3 days for Pro, 7 days for Economy
    const now = Date.now();
    
    if (now - createdAt < waitHours * 60 * 60 * 1000) {
      this.logger.warn(`[Layer 1] FRAUD BLOCKED. Policy ${policy.id} is still in its ${waitHours}h waiting period.`);
      return { status: 'DENIED', reason: `In ${waitHours}h mandatory waiting period.`, layer: 1 };
    }

    this.logger.debug(`[Layer 1] Wait Period Check Passed.`);

    // LAYER 2: TELEMETRY & H3 CORROBORATION (The Zero-Trust Math)
    const activeTelemetryRecord = await this.redisService.get(`worker:active:${payload.workerId}`);
    
    if (!activeTelemetryRecord) {
      this.logger.error(`[Layer 2] FRAUD BLOCKED. No active background telemetry found for ${payload.workerId} in the last 10 minutes.`);
      return { status: 'DENIED', reason: 'Absent Telemetry. Spoofing suspected.', layer: 2 };
    }

    const telemetry = JSON.parse(activeTelemetryRecord);
    const workerHistory = await this.telemetryService.getWorkerHistory(payload.workerId);
    
    // ACCURACY: Use Level 10 Hex for Laser Precision (~38m edge, ~66m diameter)
    const incidentCell = h3.latLngToCell(payload.lat, payload.lng, 10);
    
    // LAYER 2.5: SPATIAL-TEMPORAL TRAJECTORY (The 'Trajectory' Gap)
    // Even if current ping is slightly off, we check if ANY of the last 5 pings were within proximity.
    const isPresentHistorically = workerHistory.some(ping => {
      const dist = h3.gridDistance(ping.h3Cell, incidentCell);
      return dist <= 2; // Within 2 Res-10 Hexes (~130m range)
    });

    if (!isPresentHistorically) {
      this.logger.error(`[Layer 2] FRAUD BLOCKED. Worker ${payload.workerId} spatial footprint not found in incident zone.`);
      return { status: 'DENIED', reason: 'Spatial mismatch: Trajectory doesn\'t cross epicenter.', layer: 2 };
    }

    // ACCURACY: Calculated Displacement
    const latestHexDist = h3.gridDistance(telemetry.h3Cell, incidentCell);
    const exactDistanceMeters = latestHexDist * 66; // Approx diameter for Res 10
    
    this.logger.log(`[Layer 2] Telemetry physically corroborated. Hex Distance: ${latestHexDist}. Displacement: ~${exactDistanceMeters}m.`);

    // LAYER 3: PEER CORROBORATION & ESCROW
    const peerScore = await this.simulatePeerCorroboration(incidentCell);
    
    if (peerScore < 0.5) {
      this.logger.warn(`[Layer 3] Low Peer Corroboration. Placing funds in Escrow for Admin Review.`);
      return { status: 'ESCROW', reason: 'Insufficient peer corroboration in Hex.', layer: 3 };
    }

    this.logger.log(`[Layer 3] Peer network confirmed disruption. Escrow released.`);
    
    // LAYER 4: TRANSACTIONAL PERSISTENCE (Supabase Claim Entry)
    const { data: claim, error: claimError } = await this.supabaseService.client
      .from('claims')
      .insert({
        policy_id: policy.id,
        trigger_type: payload.eventType.toUpperCase(),
        trigger_value: 100, // Simulated intensity
        payout_amount: 1500,
        status: 'VALIDATED_FOR_PAYOUT',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (claimError) {
      this.logger.error(`[DB Error] Failed to persist claim: ${claimError.message}`);
      return { status: 'ERROR', reason: 'Database persistence failure.' };
    }

    this.logger.log(`[DB Success] Claim created: ${claim.id}`);

    // Trigger Black Swan Liability Check via Payouts
    const success = await this.payoutService.processPayout(claim.id, 1500, payload.workerId);

    return { 
      status: success ? 'APPROVED' : 'POOLED_LIQUIDITY_LIMIT', 
      claimId: claim.id,
      payout: success ? '₹1500' : '₹0', 
      distance: `${exactDistanceMeters.toFixed(1)}m`,
      layer: 4
    };
    } finally {
      // RELEASE IDEMPOTENCY LOCK
      await this.redisService.releaseLock(lockKey);
    }
  }

  private async simulatePeerCorroboration(hexCell: string) {
    return 0.85; 
  }

  /**
   * The actual validation logic executed by the worker.
   */
  async executeClaimValidation(dto: CreateClaimDto): Promise<any> {
    const lockKey = `policy:${dto.policy_id}`;
    const acquired = await this.redisService.acquireLock(lockKey);

    if (!acquired) {
      this.logger.warn(`Could not acquire lock for policy ${dto.policy_id}. Job may be a duplicate.`);
      return; // Exit if another worker is already processing this policy
    }

    try {
      this.logger.log(`Executing background validation for policy ${dto.policy_id}`);

      // 0. Idempotency Check (Pro Guard)
      const { data: existing } = await this.supabaseService.client
        .from('claims')
        .select('id')
        .eq('policy_id', dto.policy_id)
        .eq('status', 'VALIDATED_FOR_PAYOUT') // Or check for same trigger window
        .limit(1)
        .maybeSingle();

      if (existing) {
        this.logger.warn(`Claim already exists for policy ${dto.policy_id}. Skipping.`);
        return;
      }

      // 1. Layer 1 Verification (Binary Veto)
      await this.runLayer1Checks(dto);

      // 2. Layer 2 Verification (Behavioral Soft Flags)
      const fraudScore = await this.runLayer2Checks(dto);

      // 3. Gate 4: Historical Validation (Escrow Trigger)
      const isHistoricallyValidated = await this.validateClaimWithHistory(dto);

      // 4. Calculate H3 Index for spatial storage (Track D)
      const { data: qPolicy } = await this.supabaseService.client
        .from('policies')
        .select('lat, lon')
        .eq('id', dto.policy_id)
        .single();
      
      const h3Index = qPolicy ? this.h3Service.latLngToCell(qPolicy.lat, qPolicy.lon, 7) : null;

      // 5. Create Claim in Supabase with status
      const { data, error } = await this.supabaseService.client
        .from('claims')
        .insert({
          policy_id: dto.policy_id,
          trigger_type: dto.trigger_type,
          trigger_value: dto.trigger_value,
          payout_amount: dto.payout_amount,
          fraud_score: fraudScore,
          h3_index: h3Index,
          status: !isHistoricallyValidated 
            ? 'PENDING_HISTORICAL_CHECK' 
            : (fraudScore > 70 ? 'FLAGGED_FOR_REVIEW' : 'VALIDATED_FOR_PAYOUT'),
        })
        .select()
        .single();

      if (error) throw new Error(`Claim creation failed: ${error.message}`);

      // 6. Trigger Automated Payout if validated (Track F)
      if (data.status === 'VALIDATED_FOR_PAYOUT') {
        await this.payoutService.processPayout(
          data.id,
          data.payout_amount,
          'worker@waaax'
        );
      }

      return data;
    } finally {
      await this.redisService.releaseLock(lockKey);
    }
  }

  /**
   * Layer 1: Waiting periods, active status, identity mismatch.
   */
  private async runLayer1Checks(dto: CreateClaimDto) {
    const { data: policy, error } = await this.supabaseService.client
      .from('policies')
      .select('*, profiles(*)')
      .eq('id', dto.policy_id)
      .single();

    if (error || !policy) {
      throw new BadRequestException('Invalid policy ID');
    }

    // Check Waiting Period (e.g., 24 hours from purchase)
    const createdAt = new Date(policy.created_at).getTime();
    const now = Date.now();
    if (now - createdAt < 24 * 60 * 60 * 1000) {
      throw new BadRequestException('Claim rejected: Policy is still in the 24h waiting period.');
    }

    // Check if policy is active
    if (policy.status !== 'ACTIVE') {
      throw new BadRequestException('Claim rejected: Policy is not active.');
    }
  }

  /**
   * Layer 2: Behavioral analysis and Peer Corroboration.
   */
  private async runLayer2Checks(dto: CreateClaimDto): Promise<number> {
    let fraudScore = 0;

    // Check 1: Peer Corroboration (Track D)
    const peerReports = await this.runPeerCorroboration(dto);
    if (peerReports < 5) {
      fraudScore += 30; // High suspicion if isolated report
      this.logger.warn(`Isolated claim detected for policy ${dto.policy_id}. Peer count: ${peerReports}`);
    }

    // Check 2: Geo-velocity check (Track D)
    const velocityScore = await this.runVelocityCheck(dto);
    fraudScore += velocityScore;
    
    return fraudScore;
  }

  /**
   * Detects "impossible moves" by comparing current claim to last report.
   */
  private async runVelocityCheck(dto: CreateClaimDto): Promise<number> {
    // 1. Fetch last claim for this policy
    const { data: lastClaim } = await this.supabaseService.client
      .from('claims')
      .select('h3_index, created_at')
      .eq('policy_id', dto.policy_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!lastClaim || !lastClaim.h3_index) return 0;

    // 2. Get current H3 cell
    const { data: policy } = await this.supabaseService.client
      .from('policies')
      .select('lat, lon')
      .eq('id', dto.policy_id)
      .single();

    if (!policy) return 0;

    const currentCell = this.h3Service.latLngToCell(policy.lat, policy.lon, 7);

    // 3. Calculate distance and time delta
    const distanceKm = this.h3Service.getDistance(currentCell, lastClaim.h3_index);
    const timeHours = (Date.now() - new Date(lastClaim.created_at).getTime()) / (1000 * 3600);

    if (timeHours <= 0) return 0;

    const speedKmh = distanceKm / timeHours;

    this.logger.debug(`Velocity check for policy ${dto.policy_id}: ${speedKmh.toFixed(2)} km/h`);

    // 4. Flag if speed > 100km/h (Impossible for city delivery)
    if (speedKmh > 100) {
      this.logger.warn(`High velocity detected for policy ${dto.policy_id}: ${speedKmh.toFixed(2)} km/h`);
      return 50; // Severe fraud flag
    }

    return 0;
  }

  /**
   * Space-time clustering for claim validation.
   */
  private async runPeerCorroboration(dto: CreateClaimDto): Promise<number> {
    // Get H3 cell for this claim
    // We assume policy has lat/lon
    const { data: policy } = await this.supabaseService.client
      .from('policies')
      .select('lat, lon')
      .eq('id', dto.policy_id)
      .single();

    if (!policy) return 0;

    const cell = this.h3Service.latLngToCell(policy.lat, policy.lon, 7);

    // Query claims in the same H3 cell within the last 2 hours
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    
    const { count, error } = await this.supabaseService.client
      .from('claims')
      .select('*', { count: 'exact', head: true })
      .eq('h3_index', cell)
      .gte('created_at', twoHoursAgo);

    if (error) {
      this.logger.error(`Peer corroboration query failed: ${error.message}`);
      return 0;
    }

    return count || 0;
  }

  /**
   * Gate 4: Cross-reference with historical weather data using multi-source consensus.
   */
  private async validateClaimWithHistory(dto: CreateClaimDto): Promise<boolean> {
    try {
      const { data: policy } = await this.supabaseService.client
        .from('policies')
        .select('lat, lon')
        .eq('id', dto.policy_id)
        .single();
      
      if (!policy) return false;

      // Use Multi-Source Consensus (Track B/E)
      const consensusData = await this.weatherService.getConsensusWeather(
        policy.lat, 
        policy.lon
      );

      this.logger.log(`Consensus score for policy ${dto.policy_id}: ${consensusData.consensus}`);

      // Verify trigger threshold against consensus data
      if (dto.trigger_type === 'RAIN_EXTREME') {
        const isTriggered = consensusData.rain >= 1.0; // Loosened threshold for historical confirmation
        return isTriggered && consensusData.consensus >= 0.8;
      }

      return consensusData.consensus >= 0.8;
    } catch (error) {
      this.logger.warn(`Historical consensus failed: ${error.message}`);
      return false; // Fail-safe to manual/pending
    }
  }
}
