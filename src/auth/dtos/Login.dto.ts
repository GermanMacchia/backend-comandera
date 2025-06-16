import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsDefined()
  clave: string;

  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
}
