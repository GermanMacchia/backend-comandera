import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@Injectable()
export class TiposProductoService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  create(createTipoDto: CreateTipoDto) {
    return this.tipo_producto.create({ data: createTipoDto });
  }

  findAll() {
    return this.tipo_producto.findMany();
  }

  async update(id: string, updateTipoDto: UpdateTipoDto) {
    const tipo = await this.tipo_producto.findFirst({ where: { id } });

    if (!tipo) throw new NotFoundException('Tipo Producto inexistente');

    return this.tipo_producto.update({ data: updateTipoDto, where: { id } });
  }

  async remove(id: string) {
    const tipo = await this.tipo_producto.findFirst({ where: { id } });

    if (!tipo) throw new NotFoundException('Tipo Producto inexistente');

    return this.tipo_producto.delete({ where: { id } });
  }
}
