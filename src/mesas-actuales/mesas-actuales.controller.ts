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
import { CreateMesaActualDto } from './dto/create-mesa-actual.dto';
import { UpdateMesaActualDto } from './dto/update-mesa-actual.dto';
import { MesasActualesService } from './mesas-actuales.service';

@Controller('mesas-actuales')
export class MesasActualesController {
  constructor(private readonly mesasActualesService: MesasActualesService) {}

  @Post()
  create(@Body() createMesasActualeDto: CreateMesaActualDto) {
    return this.mesasActualesService.create(createMesasActualeDto);
  }

  @Get()
  findAll() {
    return this.mesasActualesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mesasActualesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMesasActualeDto: UpdateMesaActualDto,
  ) {
    return this.mesasActualesService.update(id, updateMesasActualeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mesasActualesService.remove(id);
  }
}
