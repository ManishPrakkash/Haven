import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export enum TriggerType {
  RAIN_EXTREME = 'RAIN_EXTREME',
  AQI_SEVERE = 'AQI_SEVERE',
  HEAT_EXTREME = 'HEAT_EXTREME',
  PLATFORM_OUTAGE = 'PLATFORM_OUTAGE',
  SOCIAL_DISRUPTION = 'SOCIAL_DISRUPTION',
}

export class CreateClaimDto {
  @IsUUID()
  @IsNotEmpty()
  policy_id: string;

  @IsEnum(TriggerType)
  @IsNotEmpty()
  trigger_type: TriggerType;

  @IsNumber()
  @Min(0)
  payout_amount: number;

  @IsNumber()
  trigger_value: number;
}
