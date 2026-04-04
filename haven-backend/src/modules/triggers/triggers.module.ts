import { Module } from '@nestjs/common';
import { TriggersService } from './triggers.service';
import { WeatherModule } from '../weather/weather.module';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [WeatherModule, SupabaseModule],
  providers: [TriggersService],
  exports: [TriggersService],
})
export class TriggersModule {}
