import { IsNumber, Min } from 'class-validator';

export class CreateAreaMesaDto {
  @IsNumber()
  @Min(1)
  area_id: number;

  @IsNumber()
  @Min(1)
  mesa_id: number;
}
