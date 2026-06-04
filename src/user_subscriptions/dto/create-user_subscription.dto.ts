import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  subscription_id: number;
}
