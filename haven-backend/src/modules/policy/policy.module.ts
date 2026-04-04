import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { ActuarialService } from './actuarial.service';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [PolicyController],
  providers: [PolicyService, ActuarialService],
  exports: [PolicyService, ActuarialService],
})
export class PolicyModule {}
