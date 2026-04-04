import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ClaimsService } from '../claims/claims.service';

export interface SimulationPayload {
  workerId: string;
  lat: number;
  lng: number;
  eventType: string; // 'rain', 'aqi', 'heat', 'outage', 'curfew'
  zone: string;
  timestamp: string;
}

@Controller('triggers')
export class TriggersController {
  private readonly logger = new Logger(TriggersController.name);

  constructor(private readonly claimsService: ClaimsService) {}

  /**
   * Accepts a disaster trigger from the "Sensory Layer" (swiggy-mock) 
   * and pushes it into the 3-Layer Fraud Engine for evaluation.
   */
  @Post('simulate')
  async simulateTrigger(@Body() payload: SimulationPayload) {
    this.logger.warn(`SIMULUS RECEIVED: [${payload.eventType.toUpperCase()}] in Zone ${payload.zone} from Worker ${payload.workerId}`);
    
    // Pass to the Fraud Pipeline (Claims Service)
    const result = await this.claimsService.processSimulation(payload);
    
    // We return the evaluation result of the fraud engine
    return {
      status: 'evaluated',
      engineResult: result
    };
  }
}
