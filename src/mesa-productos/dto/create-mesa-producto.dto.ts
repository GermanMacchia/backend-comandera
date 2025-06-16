import { IsNumber, Min } from 'class-validator';

export class CreateMesaProductoDto {
  @IsNumber()
  @Min(1)
  mesa_id: number;

  @IsNumber()
  @Min(1)
  producto_id: number;
}
