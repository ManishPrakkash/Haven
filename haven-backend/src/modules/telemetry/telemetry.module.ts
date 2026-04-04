import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [RedisModule], // Inject Redis to cache H3 locations
  controllers: [TelemetryController],
  providers: [TelemetryService],
  exports: [TelemetryService],
})
export class TelemetryModule {}
