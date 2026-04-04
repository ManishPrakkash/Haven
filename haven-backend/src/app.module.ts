import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import Redis from 'ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { H3Module } from './h3/h3.module';
import { WeatherModule } from './modules/weather/weather.module';
import { TriggersModule } from './modules/triggers/triggers.module';
import { ClaimsModule } from './modules/claims/claims.module';
import { PayoutModule } from './modules/payout/payout.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PolicyModule } from './modules/policy/policy.module';
import { RedisModule } from './redis/redis.module';
import { TelemetryModule } from './modules/telemetry/telemetry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        
        if (redisUrl) {
          return {
            connection: new Redis(redisUrl, {
              maxRetriesPerRequest: null, // Required by BullMQ
            }),
          };
        }

        return {
          connection: {
            host: configService.get('REDIS_HOST', 'localhost'),
            port: configService.get('REDIS_PORT', 6379),
            maxRetriesPerRequest: null,
          },
        };
      },
    }),
    SupabaseModule,
    RedisModule,
    H3Module,
    WeatherModule,
    TriggersModule,
    ClaimsModule,
    PayoutModule,
    ProfileModule,
    PolicyModule,
    TelemetryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
