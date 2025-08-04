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
    return this.mesas.create({ data: createMesaDto });
  }

  findAll() {
    return this.mesas.findMany();
  }

  async update(id: string, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.mesas.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa inexistente');

    return this.mesas.update({ data: updateMesaDto, where: { id } });
  }

  async remove(id: string) {
    const mesa = await this.mesas.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa inexistente');

    return this.mesas.delete({ where: { id } });
  }
}
