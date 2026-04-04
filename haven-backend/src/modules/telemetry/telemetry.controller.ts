import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

export interface TelemetryPayload {
  workerId: string;
  name: string;
  platform: string;
  lat: number;
  lng: number;
  isOnline: boolean;
  timestamp: string;
}

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('ping')
  async receivePing(@Body() payload: TelemetryPayload) {
    await this.telemetryService.processWorkerTelemetry(payload);
    return { status: 'acknowledged' };
  }

  @Get('status/:workerId')
  async getStatus(@Param('workerId') id: string) {
    const data = await this.telemetryService.getWorkerTelemetry(id);
    return {
      status: data ? 'ONLINE' : 'OFFLINE',
      telemetry: data
    };
  }
}
