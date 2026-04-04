import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Controller('claims')
export class ClaimsController {
  private readonly logger = new Logger(ClaimsController.name);

  constructor(private readonly claimsService: ClaimsService) {}

  /**
   * Enqueues a claim for background parametric verification.
   */
  @Post('submit')
  async submitClaim(@Body() dto: CreateClaimDto) {
    this.logger.log(`Received claim submission for policy ${dto.policy_id}`);
    await this.claimsService.processClaim(dto);
    return {
      message: 'Claim submitted and enqueued for background validation.',
      policy_id: dto.policy_id,
      timestamp: new Date().toISOString(),
    };
  }
}
