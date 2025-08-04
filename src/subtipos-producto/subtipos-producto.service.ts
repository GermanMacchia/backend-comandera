import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSubtipoDto } from './dto/create-subtipo.dto';
import { UpdateSubtipoDto } from './dto/update-subtipo.dto';

@Injectable()
export class SubtiposProductoService
  extends PrismaClient
  implements OnModuleInit
{
  onModuleInit() {
    this.$connect();
  }

  create(createSubtipoDto: CreateSubtipoDto) {
    return this.subtipo_producto.create({ data: createSubtipoDto });
  }

  findAll() {
    return this.subtipo_producto.findMany();
  }

  async update(id: string, updateSubtipoDto: UpdateSubtipoDto) {
    const subtipo = await this.subtipo_producto.findFirst({ where: { id } });

    if (!subtipo) throw new NotFoundException('Subtipo Producto inexistente');

    return this.subtipo_producto.update({
      data: updateSubtipoDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const subtipo = await this.subtipo_producto.findFirst({ where: { id } });

    if (!subtipo) throw new NotFoundException('Subtipo Producto inexistente');

    return this.subtipo_producto.delete({ where: { id } });
  }
}
