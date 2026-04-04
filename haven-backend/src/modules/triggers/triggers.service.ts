import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from '../weather/weather.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class TriggersService {
  private readonly logger = new Logger(TriggersService.name);

  constructor(
    private readonly weatherService: WeatherService,
    private readonly supabaseService: SupabaseService,
  ) {}

  /**
   * Periodic job to poll weather for active policy zones.
   * Runs every 30 minutes.
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async pollWeatherTriggers() {
    this.logger.log('Polling environmental triggers for active policies...');

    try {
      // 1. Get unique active risk zones from policies
      const { data: zones, error } = await this.supabaseService.client
        .from('active_zones') // Assuming a view or table for unique active geo-clusters
        .select('*');

      if (error) throw error;

      for (const zone of zones) {
        const weather = await this.weatherService.getCurrentWeather(zone.lat, zone.lon);
        
        // 2. Check thresholds (Example: Rain > 2.5mm/hr for Economy)
        if (weather.rain && weather.rain['1h'] >= 2.5) {
          this.logger.log(`RAIN_EXTREME detected in zone ${zone.id}`);
          await this.handleTriggerEvent('RAIN_EXTREME', zone.id, weather.rain['1h']);
        }

        // 3. Check AQI (Example: AQI > 300)
        // Note: Requires a separate AQI API call or OWM Air Pollution API
        if (weather.main.temp > 45) {
          this.logger.log(`HEAT_EXTREME detected in zone ${zone.id}`);
          await this.handleTriggerEvent('HEAT_EXTREME', zone.id, weather.main.temp);
        }
      }
    } catch (error) {
      this.logger.error(`Trigger polling failed: ${error.message}`);
    }
  }

  private async handleTriggerEvent(type: string, zoneId: string, value: number) {
    // 4. Upsert into a 'trigger_events' table to maintain state (Track B)
    const { error } = await this.supabaseService.client
      .from('trigger_events')
      .upsert({
        trigger_type: type,
        zone_id: zoneId,
        trigger_value: value,
        detected_at: new Date().toISOString(),
        status: 'PENDING_VALIDATION',
      });

    if (error) {
      this.logger.error(`Failed to record trigger event: ${error.message}`);
    }
  }
}
