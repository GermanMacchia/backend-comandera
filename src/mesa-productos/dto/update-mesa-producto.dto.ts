import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaProductoDto } from './create-mesa-producto.dto';

export class UpdateMesaProductoDto extends PartialType(CreateMesaProductoDto) {}
