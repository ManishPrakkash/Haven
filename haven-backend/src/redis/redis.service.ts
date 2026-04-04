import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  /**
   * Expose the underlying Redis client for complex operations (LPUSH, LTRIM, etc.)
   */
  get client(): Redis {
    return this.redis;
  }

  /**
   * Deletes a key from Redis
   */
  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  /**
   * Acquires a distributed lock for a specific resource key using Redis.
   */
  async acquireLock(key: string, ttl: number = 30000): Promise<boolean> {
    const lockKey = `lock:${key}`;

    try {
      const result = await this.redis.set(lockKey, 'locked', 'PX', ttl, 'NX');
      const acquired = result === 'OK';
      
      if (acquired) {
        this.logger.debug(`Lock acquired for ${key}`);
      } else {
        this.logger.warn(`Lock already held for ${key}`);
      }
      return acquired;
    } catch (error) {
      this.logger.error(`Redis acquireLock failed: ${error.message}. Falling back to allow processing.`);
      return true; // Fail-safe to avoid blocking critical flows
    }
  }

  /**
   * Releases a distributed lock for a specific resource key.
   */
  async releaseLock(key: string): Promise<void> {
    const lockKey = `lock:${key}`;

    try {
      await this.redis.del(lockKey);
      this.logger.debug(`Lock released for ${key}`);
    } catch (error) {
      this.logger.warn(`Redis releaseLock failed: ${error.message}`);
    }
  }

  /**
   * Set a key-value pair in Redis with an optional TTL in seconds
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await this.redis.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.redis.set(key, value);
      }
    } catch (error) {
      this.logger.error(`Redis set failed for key ${key}: ${error.message}`);
    }
  }

  /**
   * Get a value from Redis by key
   */
  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch (error) {
      this.logger.error(`Redis get failed for key ${key}: ${error.message}`);
      return null;
    }
  }
}
