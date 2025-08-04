import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  public nombre: string;

  @IsString()
  @IsOptional()
  public descripcion: string;

  @IsString()
  @IsOptional()
  public nota: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  public precio: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  public costo: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  public tiempo_elaboracion: number;

  @IsString()
  @IsNotEmpty()
  public tipo_id: string;

  @IsString()
  @IsNotEmpty()
  public subtipo_id: string;
}
