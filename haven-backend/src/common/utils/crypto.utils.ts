import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoUtils {
  /**
   * Generates a SHA-256 hash of a string (e.g., Aadhaar number).
   * This ensures privacy while still allowing for identity de-duplication.
   */
  hashAadhaar(aadhaar: string): string {
    return crypto
      .createHash('sha256')
      .update(aadhaar)
      .digest('hex');
  }

  /**
   * Simple salted hash for more secure storage.
   */
  hashWithSalt(data: string, salt: string): string {
    return crypto
      .createHash('sha256')
      .update(data + salt)
      .digest('hex');
  }
}
