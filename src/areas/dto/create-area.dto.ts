import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsOptional()
  public nombre: string;

  @IsString()
  @IsOptional()
  public color: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  public usuario_id: number;
}
