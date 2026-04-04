import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum PlanType {
  ECONOMY = 'Economy',
  VALUE = 'Value',
  ELITE = 'Elite',
}

export class CreatePolicyDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsEnum(PlanType)
  @IsNotEmpty()
  plan_type: PlanType;

  @IsString()
  @IsNotEmpty()
  risk_zone: string;
}
