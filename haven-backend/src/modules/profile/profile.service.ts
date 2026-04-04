import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CryptoUtils } from '../../common/utils/crypto.utils';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly cryptoUtils: CryptoUtils,
  ) {}

  /**
   * Creates a new worker profile with a privacy-preserving Aadhaar hash.
   */
  async createProfile(dto: CreateProfileDto) {
    const aadhaarHash = this.cryptoUtils.hashAadhaar(dto.aadhaar_number);

    // 1. Check for duplicate Aadhaar (Pro Guard)
    const { data: existing } = await this.supabaseService.client
      .from('profiles')
      .select('id')
      .eq('aadhaar_hash', aadhaarHash)
      .maybeSingle();

    if (existing) {
      throw new ConflictException('A profile with this Aadhaar already exists.');
    }

    // 2. Insert profile with hashed identity
    const { data, error } = await this.supabaseService.client
      .from('profiles')
      .insert({
        full_name: dto.full_name,
        aadhaar_hash: aadhaarHash,
        phone: dto.phone,
        device_fingerprint: dto.device_fingerprint, // Track hardware ID for fraud checks
        status: 'PENDING_VERIFICATION',
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create profile: ${error.message}`);
      throw new Error(`Profile creation failed: ${error.message}`);
    }

    this.logger.log(`Profile created successfully for ${dto.full_name}`);
    return data;
  }
}
