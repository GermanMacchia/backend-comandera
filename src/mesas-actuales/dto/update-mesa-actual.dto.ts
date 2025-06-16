import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaActualDto } from './create-mesa-actual.dto';

export class UpdateMesaActualDto extends PartialType(CreateMesaActualDto) {}
