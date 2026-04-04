import { Controller, Post, Body, Logger, Put, Param } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { ActuarialService, PricingQuoteRequest } from './actuarial.service';
import { CreatePolicyDto } from './dto/create-policy.dto';

@Controller('policy')
export class PolicyController {
  private readonly logger = new Logger(PolicyController.name);

  constructor(
    private readonly policyService: PolicyService,
    private readonly actuarialService: ActuarialService,
  ) {}

  /**
   * Registers a new insurance policy (Economy, Value, or Elite).
   */
  @Post()
  async createPolicy(@Body() dto: CreatePolicyDto) {
    this.logger.log(`Registering policy for user ${dto.user_id} with plan ${dto.plan_type}`);
    const data = await this.policyService.createPolicy(dto);
    return {
      message: 'Policy activated.',
      policy_id: data.id,
      status: data.status,
      premium: data.premium_amount,
    };
  }

  /**
   * Updates policy status (for testing state transitions).
   */
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ACTIVE' | 'LAPSED' | 'EXPIRED',
  ) {
    await this.policyService.updateStatus(id, status);
    return { message: `Status updated to ${status}` };
  }

  /**
   * Generates a dynamic premium quote using Actuarial Risk modeling.
   */
  @Post('quotes')
  async getPricingQuote(@Body() body: PricingQuoteRequest) {
    this.logger.debug(`Generating dynamic quote for ${body.city} | ${body.planLevel}`);
    const quote = this.actuarialService.calculateDynamicPremium(body);
    return {
      status: 'success',
      data: quote,
    };
  }
}
