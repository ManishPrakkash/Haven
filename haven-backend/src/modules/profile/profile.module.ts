import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { CryptoUtils } from '../../common/utils/crypto.utils';

@Module({
  imports: [SupabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService, CryptoUtils],
  exports: [ProfileService],
})
export class ProfileModule {}
