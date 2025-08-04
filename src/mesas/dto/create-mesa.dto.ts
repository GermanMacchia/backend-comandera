import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMesaDto {
  @IsString()
  public nombre: string;

  @IsString()
  @IsOptional()
  public area_id: string;
}
