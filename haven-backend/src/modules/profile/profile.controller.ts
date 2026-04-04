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
}
