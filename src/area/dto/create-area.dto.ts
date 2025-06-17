import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  usuario_id: number;
}
