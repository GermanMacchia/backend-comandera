import { IsNumber, IsString, Min } from 'class-validator';

export class CreateMesaActualDto {
  @IsNumber()
  @Min(1)
  public comensales: number;

  @IsString()
  @Min(1)
  public mesa_id: string;

  @IsString()
  @Min(1)
  public usuario_id: string;
}
