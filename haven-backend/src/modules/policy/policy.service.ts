import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreatePolicyDto, PlanType } from './dto/create-policy.dto';

@Injectable()
export class PolicyService {
  private readonly logger = new Logger(PolicyService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * Registers a new insurance policy for a worker based on selected plan.
   */
  async createPolicy(dto: CreatePolicyDto) {
    // Map plans to premium amounts (Pro logic)
    const premiumMap = {
      [PlanType.ECONOMY]: 299,
      [PlanType.VALUE]: 599,
      [PlanType.ELITE]: 999,
    };

    const { data, error } = await this.supabaseService.client
      .from('policies')
      .insert({
        worker_id: dto.user_id,
        plan_type: dto.plan_type,
        risk_zone: dto.risk_zone,
        premium_amount: premiumMap[dto.plan_type],
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create policy: ${error.message}`);
      throw new Error(`Policy creation failed: ${error.message}`);
    }

    return data;
  }

  /**
   * Updates policy status (e.g., when payment is missed).
   */
  async updateStatus(policyId: string, status: 'ACTIVE' | 'LAPSED' | 'EXPIRED') {
    const { error } = await this.supabaseService.client
      .from('policies')
      .update({ status })
      .eq('id', policyId);

    if (error) throw new BadRequestException(`Status update failed: ${error.message}`);
    this.logger.log(`Policy ${policyId} status updated to ${status}`);
  }
}
