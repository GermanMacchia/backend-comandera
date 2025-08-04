import { IsNumber, IsString, Min } from 'class-validator';

export class CreateMesaProductoDto {
  @IsString()
  mesa_id: string;

  @IsString()
  producto_id: string;
}
