import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        
        const client = redisUrl 
          ? new Redis(redisUrl, {
              maxRetriesPerRequest: 20,
              retryStrategy: (times) => Math.min(times * 50, 2000),
            })
          : new Redis({
              host: configService.get<string>('REDIS_HOST', 'localhost'),
              port: configService.get<number>('REDIS_PORT', 6379),
              lazyConnect: true,
              maxRetriesPerRequest: 20,
              retryStrategy: (times) => Math.min(times * 50, 2000),
            });

        client.on('error', (err) => {
          console.error(`[Redis] Connection Error: ${err.message}`);
        });

        client.on('ready', () => {
          console.log('[Redis] Cloud Connection Established 🚀');
        });

        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
