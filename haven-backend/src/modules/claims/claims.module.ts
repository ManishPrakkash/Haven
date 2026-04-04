import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { ClaimsProcessor } from './claims.processor';
import { SupabaseModule } from '../../supabase/supabase.module';
import { WeatherModule } from '../weather/weather.module';
import { PayoutModule } from '../payout/payout.module';
import { CLAIMS_QUEUE } from './constants';

@Module({
  imports: [
    SupabaseModule,
    WeatherModule,
    PayoutModule,
    BullModule.registerQueue({
      name: CLAIMS_QUEUE,
    }),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService, ClaimsProcessor],
  exports: [ClaimsService],
})
export class ClaimsModule {}
