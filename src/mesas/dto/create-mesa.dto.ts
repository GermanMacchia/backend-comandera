import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMesaDto {
  @IsString()
  public nombre: string;

  @IsNumber()
  @IsOptional()
  public area_id: number;
}
