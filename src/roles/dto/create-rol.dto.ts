import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty()
  public nombre: string;
}
