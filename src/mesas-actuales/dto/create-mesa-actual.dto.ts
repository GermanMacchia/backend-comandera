import { IsNumber, Min } from 'class-validator';

export class CreateMesaActualDto {
  @IsNumber()
  @Min(1)
  public comensales: number;

  @IsNumber()
  @Min(1)
  public mesa_id: number;

  @IsNumber()
  @Min(1)
  public usuario_id: number;
}
