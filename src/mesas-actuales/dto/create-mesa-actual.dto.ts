import { IsNumber, Min } from 'class-validator';

export class CreateMesaActualDto {
  @IsNumber()
  @Min(1)
  comensales: number;

  @IsNumber()
  @Min(1)
  mesa_id: number;

  @IsNumber()
  @Min(1)
  usuario_id: number;
}
