import { IsString } from 'class-validator';

export class CreateMesaDto {
  @IsString()
  public nombre: string;
}
