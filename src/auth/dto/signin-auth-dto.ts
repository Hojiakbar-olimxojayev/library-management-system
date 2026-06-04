import { IsNotEmpty, IsString } from 'class-validator';

export class SigninAuthDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
