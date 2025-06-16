import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OMIT_TIMESTAMPS } from '../interfaces/enum';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit {
  private OMIT_TIMESTAMPS = OMIT_TIMESTAMPS;
  onModuleInit() {
    this.$connect();
  }

  create(createProductoDto: CreateProductoDto) {
    return this.producto.create({ data: createProductoDto });
  }

  findAll() {
    return this.producto.findMany({
      omit: {
        tipo_id: true,
        subtipo_id: true,
      },
      include: {
        tipo_producto: this.OMIT_TIMESTAMPS,
        sutipo_producto: this.OMIT_TIMESTAMPS,
      },
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.producto.findFirst({ where: { id } });

    if (!producto) throw new NotFoundException('Producto inexistente');

    return this.producto.update({ data: updateProductoDto, where: { id } });
  }

  async remove(id: number) {
    const producto = await this.producto.findFirst({ where: { id } });

    if (!producto) throw new NotFoundException('Producto inexistente');

    return this.producto.delete({ where: { id } });
  }
}
