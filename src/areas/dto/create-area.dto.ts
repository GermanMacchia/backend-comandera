import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  public nombre: string;

  @IsString()
  @IsOptional()
  public color: string;

  @IsString()
  @IsOptional()
  public usuario_id: string;
}
