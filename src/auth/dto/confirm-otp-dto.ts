import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
