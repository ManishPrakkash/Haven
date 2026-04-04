import { Injectable, Logger } from '@nestjs/common';
import { latLngToCell } from 'h3-js';
import { TelemetryPayload } from './telemetry.controller';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);

  constructor(private readonly redisService: RedisService) {}

  async processWorkerTelemetry(payload: TelemetryPayload) {
    if (!payload.lat || !payload.lng) return;

    // Convert GPS coordinates to Uber H3 Grid Cell (Resolution 9 = ~174 meters wide hexagon)
    const h3Cell = latLngToCell(payload.lat, payload.lng, 9);

    // Save strictly to Upstash Serverless Redis
    // Key: worker:active:{workerId}
    // Value includes the H3 cell, status, and precise timestamp
    // TTL: 600 seconds (10 minutes). If no ping in 10 minutes, they are mathematically "offline"/lost.
    const redisKey = `worker:active:${payload.workerId}`;
    const historyKey = `worker:history:${payload.workerId}`;
    
    // Store latest state (Standard GET/SET)
    await this.redisService.set(redisKey, JSON.stringify({
      h3Cell,
      isOnline: payload.isOnline,
      timestamp: payload.timestamp,
      platform: payload.platform,
    }), 600);

    // Maintain Sliding Window History (Trajectory Analysis)
    // Push the new coordinate, then trim the list to the last 5 pings.
    const pingData = JSON.stringify({ h3Cell, timestamp: payload.timestamp });
    await this.redisService.client.lpush(historyKey, pingData);
    await this.redisService.client.ltrim(historyKey, 0, 4);
    await this.redisService.client.expire(historyKey, 600);

    this.logger.debug(`Telemetry saved: Worker ${payload.workerId} - Path Updated (Last 5 Pings)`);
  }

  async getWorkerHistory(workerId: string): Promise<any[]> {
    const historyKey = `worker:history:${workerId}`;
    const data = await this.redisService.client.lrange(historyKey, 0, -1);
    return data.map(ping => JSON.parse(ping));
  }

  async getWorkerTelemetry(workerId: string) {
    const redisKey = `worker:active:${workerId}`;
    const raw = await this.redisService.get(redisKey);
    if (!raw) return null;
    return JSON.parse(raw);
  }
}
