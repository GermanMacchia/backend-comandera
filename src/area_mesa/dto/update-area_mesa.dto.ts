import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaMesaDto } from './create-area_mesa.dto';

export class UpdateAreaMesaDto extends PartialType(CreateAreaMesaDto) {}
