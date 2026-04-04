import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [PayoutService],
  exports: [PayoutService],
})
export class PayoutModule {}
