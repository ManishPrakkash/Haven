import { IsNotEmpty, IsNumber, IsString, Min, Max, IsPhoneNumber } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  aadhaar_number: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  device_fingerprint: string;

  @IsNumber()
  @Min(0)
  avg_salary: number;

  @IsNumber()
  @Min(0.5)
  @Max(2.0)
  safety_score_multiplier: number = 1.0;

  @IsString()
  @IsNotEmpty()
  risk_zone: 'Low' | 'Mid' | 'High';
}
