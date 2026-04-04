import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class PayoutService {
  private readonly logger = new Logger(PayoutService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

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

    this.logger.log(`Initiating automated payout for claim ${claimId} of amount ${amount} to ${workerUpi}`);

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
