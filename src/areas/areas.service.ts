import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OMIT_TIMESTAMPS } from '@src/interfaces/enum';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreasService extends PrismaClient implements OnModuleInit {
  OMIT_TIMESTAMPS = OMIT_TIMESTAMPS;

  onModuleInit() {
    this.$connect();
  }

  async create(createAreaDto: CreateAreaDto) {
    const { usuario_id } = createAreaDto;

    if (usuario_id) await this.checkUsuarioID(usuario_id);

    return await this.area.create({ data: createAreaDto });
  }

  async checkUsuarioID(id: number) {
    const usuario = await this.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario Inexistente');
  }

  findAll() {
    return this.area.findMany({
      ...this.OMIT_TIMESTAMPS,
      include: { mesas: { ...this.OMIT_TIMESTAMPS } },
    });
  }

  async findOne(id: number) {
    const area = await this.area.findFirst({
      where: { id },
      ...this.OMIT_TIMESTAMPS,
      include: { mesas: { ...this.OMIT_TIMESTAMPS } },
    });

    if (!area) throw new NotFoundException('Area inexistente');

    return area;
  }

  async findByUsuario(usuario_id: number) {
    await this.checkUsuarioID(usuario_id);

    const area = await this.area.findFirst({
      where: { usuario_id },
      ...this.OMIT_TIMESTAMPS,
      include: { mesas: { ...this.OMIT_TIMESTAMPS } },
    });

    if (!area) throw new NotFoundException('No existe area asignada');

    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const area = await this.area.findFirst({ where: { id } });

    const { usuario_id } = updateAreaDto;

    if (usuario_id) await this.checkUsuarioID(usuario_id);

    if (!area) throw new NotFoundException('Area inexistente');

    return this.area.update({ data: updateAreaDto, where: { id } });
  }

  async remove(id: number) {
    const area = await this.area.findFirst({ where: { id } });

    if (!area) throw new NotFoundException('Mesa actual inexistente');

    return this.area.delete({ where: { id } });
  }
}
