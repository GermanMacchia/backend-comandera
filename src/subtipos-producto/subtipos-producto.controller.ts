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

import { CreateSubtipoDto } from './dto/create-subtipo.dto';
import { UpdateSubtipoDto } from './dto/update-subtipo.dto';
import { SubtiposProductoService } from './subtipos-producto.service';

@Controller('subtipos-producto')
export class SubtiposProductoController {
  constructor(
    private readonly subtiposProductosService: SubtiposProductoService,
  ) {}

  @Post()
  create(@Body() createSubtipoDto: CreateSubtipoDto) {
    return this.subtiposProductosService.create(createSubtipoDto);
  }

  @Get()
  findAll() {
    return this.subtiposProductosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSubtipoDto: UpdateSubtipoDto,
  ) {
    return this.subtiposProductosService.update(+id, updateSubtipoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subtiposProductosService.remove(id);
  }
}
