import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class PayoutService {
  private readonly logger = new Logger(PayoutService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Processes an automated payout via mock Razorpay integration.
   */
  async processPayout(claimId: string, amount: number, workerUpi: string): Promise<boolean> {
    // 0. Status Guard & Idempotency Check (Pro Guard)
    const { data: claim } = await this.supabaseService.client
      .from('claims')
      .select('status')
      .eq('id', claimId)
      .single();

    if (!claim || claim.status !== 'VALIDATED_FOR_PAYOUT') {
      this.logger.warn(`Payout skipped for claim ${claimId}: Invalid status or already paid.`);
      return false;
    }

    // 0.5 GIGSHIELD ENTERPRISE: Payout Velocity Circuit Breaker (Black Swan Protection)
    const velocityKey = `payout:velocity:global:${new Date().toISOString().substring(0, 13)}`; // Hourly bucket
    const velocity = await this.redisService.client.incr(velocityKey);
    if (velocity === 1) await this.redisService.client.expire(velocityKey, 3600);
    
    if (velocity > 5) {
      this.logger.error(`[BLACK SWAN: VELOCITY] Global payout threshold exceeded (${velocity}/5). Automated payouts SUSPENDED.`);
      return false;
    }

    // 1. Black Swan Solvency Check (Pool Liability Limits)
    // In a real production system, we query the Liquidity Pool vault balance.
    const MOCK_POOL_BALANCE = 50000; // ₹50,000 left in the active pool
    const CRITICAL_THRESHOLD = 5000; // If pool < ₹5,000, trigger "Black Swan" protocol
    
    if (MOCK_POOL_BALANCE < CRITICAL_THRESHOLD) {
      this.logger.error(`[BLACK SWAN EVENT] Solvency at risk. Pool Balance: ₹${MOCK_POOL_BALANCE}. Automated payouts Halted.`);
      return false;
    }

    this.logger.log(`Initiating automated payout for claim ${claimId} of amount ₹${amount} to ${workerUpi}`);

    try {
      // Mock API latency
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update claim status to PAID in Supabase
      const { error } = await this.supabaseService.client
        .from('claims')
        .update({ status: 'PAID', paid_at: new Date().toISOString() })
        .eq('id', claimId);

      if (error) {
        this.logger.error(`Failed to update claim status for ${claimId}: ${error.message}`);
        return false;
      }

      this.logger.log(`Payout successfully completed for claim ${claimId}`);
      return true;
    } catch (error) {
      this.logger.error(`Payout processing failed for claim ${claimId}: ${error.message}`);
      return false;
    }
  }
}
