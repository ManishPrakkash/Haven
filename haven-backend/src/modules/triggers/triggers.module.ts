import { Module } from '@nestjs/common';
import { TriggersService } from './triggers.service';
import { WeatherModule } from '../weather/weather.module';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ClaimsModule } from '../claims/claims.module';
import { TriggersController } from './triggers.controller';

@Module({
  imports: [WeatherModule, SupabaseModule, ClaimsModule],
  controllers: [TriggersController],
  providers: [TriggersService],
  exports: [TriggersService],
})
export class TriggersModule {}
