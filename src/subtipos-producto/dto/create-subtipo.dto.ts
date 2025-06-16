import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtipoDto {
  @IsString()
  @IsNotEmpty()
  public nombre: string;
}
