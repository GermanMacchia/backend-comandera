import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreaMesaService } from './area_mesa.service';
import { CreateAreaMesaDto } from './dto/create-area_mesa.dto';
import { UpdateAreaMesaDto } from './dto/update-area_mesa.dto';

@Controller('area-mesa')
export class AreaMesaController {
  constructor(private readonly areaMesaService: AreaMesaService) {}

  @Post()
  create(@Body() createAreaMesaDto: CreateAreaMesaDto) {
    return this.areaMesaService.create(createAreaMesaDto);
  }

  @Get()
  findAll() {
    return this.areaMesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaMesaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaMesaDto: UpdateAreaMesaDto) {
    return this.areaMesaService.update(+id, updateAreaMesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaMesaService.remove(+id);
  }
}
