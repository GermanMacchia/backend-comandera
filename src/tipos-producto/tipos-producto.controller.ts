import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { TiposProductoService } from './tipos-producto.service';

@Controller('tipos-producto')
export class TiposProductoController {
  constructor(private readonly tiposProductosService: TiposProductoService) {}

  @Post()
  create(@Body() createTipoDto: CreateTipoDto) {
    return this.tiposProductosService.create(createTipoDto);
  }

  @Get()
  findAll() {
    return this.tiposProductosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTipoDto: UpdateTipoDto,
  ) {
    return this.tiposProductosService.update(+id, updateTipoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tiposProductosService.remove(id);
  }
}
