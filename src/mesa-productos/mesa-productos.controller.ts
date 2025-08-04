import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMesaProductoDto } from './dto/create-mesa-producto.dto';
import { UpdateMesaProductoDto } from './dto/update-mesa-producto.dto';
import { MesaProductosService } from './mesa-productos.service';

@Controller('mesa-productos')
export class MesaProductosController {
  constructor(private readonly mesaProductosService: MesaProductosService) {}

  @Post()
  create(@Body() createMesaProductoDto: CreateMesaProductoDto) {
    return this.mesaProductosService.create(createMesaProductoDto);
  }

  @Get()
  findAll() {
    return this.mesaProductosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMesaProductoDto: UpdateMesaProductoDto,
  ) {
    return this.mesaProductosService.update(id, updateMesaProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesaProductosService.remove(id);
  }
}
