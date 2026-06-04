import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class LoginAuthDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  repeat_password: string;
}
