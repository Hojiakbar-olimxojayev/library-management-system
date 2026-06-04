import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ConfirmOtpDto } from './confirm-otp-dto';

export class ResetPasswordDto extends ConfirmOtpDto {
  @IsString()
  @IsNotEmpty()
  new_password: string;

  @IsString()
  @IsNotEmpty()
  repeat_password: string;

  @IsString()
  @IsNotEmpty()
  new_login: string;
}
