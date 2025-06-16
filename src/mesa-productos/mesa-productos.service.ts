import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMesaProductoDto } from './dto/create-mesa-producto.dto';
import { UpdateMesaProductoDto } from './dto/update-mesa-producto.dto';

@Injectable()
export class MesaProductosService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  create(createMesaProductoDto: CreateMesaProductoDto) {
    return this.mesa_productos.create({ data: createMesaProductoDto });
  }

  findAll() {
    return this.mesa_productos.findMany();
  }

  async update(id: number, updateMesaProductoDto: UpdateMesaProductoDto) {
    const mesa = await this.mesa_productos.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa Producto inexistente');

    return this.mesa_productos.update({
      data: updateMesaProductoDto,
      where: { id },
    });
  }

  async remove(id: number) {
    const mesa = await this.mesa_productos.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa Producto inexistente');

    return this.mesa_productos.delete({ where: { id } });
  }
}
