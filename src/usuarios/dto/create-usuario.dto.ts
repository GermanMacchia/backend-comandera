import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  public nombre: string;

  @IsString()
  @IsNotEmpty()
  public apellido: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  public clave: string;

  @IsBoolean()
  public activo: boolean;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public rol_id: number;
}
