import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesasService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  create(createMesaDto: CreateMesaDto) {
    return this.mesa.create({ data: createMesaDto });
  }

  findAll() {
    return this.mesa.findMany();
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.mesa.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa inexistente');

    return this.mesa.update({ data: updateMesaDto, where: { id } });
  }

  async remove(id: number) {
    const mesa = await this.mesa.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa inexistente');

    return this.mesa.delete({ where: { id } });
  }
}
