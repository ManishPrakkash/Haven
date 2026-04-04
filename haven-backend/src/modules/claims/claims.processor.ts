import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { CLAIMS_QUEUE, PROCESS_CLAIM_JOB } from './constants';

@Processor(CLAIMS_QUEUE)
export class ClaimsProcessor extends WorkerHost {
  private readonly logger = new Logger(ClaimsProcessor.name);

  constructor(private readonly claimsService: ClaimsService) {
    super();
  }

  async process(job: Job<CreateClaimDto, any, string>): Promise<any> {
    this.logger.log(`Processing claim job ${job.id} for policy ${job.data.policy_id}`);

    if (job.name === PROCESS_CLAIM_JOB) {
      try {
        // In a real high-concurrency setup, we'd move the actual logic here.
        // For now, we'll call the service method.
        // Refactoring: We should split 'processClaim' into 'enqueue' and 'execute'.
        return await this.claimsService.executeClaimValidation(job.data);
      } catch (error) {
        this.logger.error(`Failed to process claim ${job.id}: ${error.message}`);
        throw error;
      }
    }
  }
}
