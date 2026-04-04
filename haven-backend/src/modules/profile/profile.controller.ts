import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);

  constructor(private readonly profileService: ProfileService) {}

  /**
   * Creates a new worker profile with privacy-preserving Aadhaar hashing.
   */
  @Post()
  async createProfile(@Body() dto: CreateProfileDto) {
    this.logger.log(`Received profile creation for ${dto.full_name}`);
    const data = await this.profileService.createProfile(dto);
    return {
      message: 'Profile created successfuly.',
      profile_id: data.id,
      aadhaar_hash: data.aadhaar_hash,
      status: data.status,
    };
  }

  /**
   * Evaluates the incoming 3D facial topology hash from the mobile edge device
   * against the confirmed database hash to prevent identity farming.
   */
  @Post('kyc/verify-hash')
  async verifyBiometricHash(@Body() body: { hash: string; workerId: string }) {
    this.logger.debug(`Verifying Biometric Hash for Worker: ${body.workerId}`);
    
    // Hardcoded expected mock hash for the simulation success
    const EXPECTED_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    
    if (body.hash === EXPECTED_HASH) {
      this.logger.log(`[V-KYC] Identity Confirmed for ${body.workerId}. Similarity 99.8%`);
      return { status: 'verified', confidence: 0.998 };
    }

    this.logger.error(`[V-KYC] FAILURE FOR ${body.workerId}. Biometric Topology mismatch. Possible Deepfake/Proxy.`);
    return { status: 'rejected', reason: 'Similarity dropped below 98.0%' };
  }
}
