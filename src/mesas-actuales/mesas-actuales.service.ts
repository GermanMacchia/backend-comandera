import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Mesa, PrismaClient } from '@prisma/client';
import { OMIT_TIMESTAMPS } from '../interfaces/enum';
import { CreateMesaActualDto } from './dto/create-mesa-actual.dto';
import { UpdateMesaActualDto } from './dto/update-mesa-actual.dto';

@Injectable()
export class MesasActualesService extends PrismaClient implements OnModuleInit {
  OMIT_TIMESTAMPS = OMIT_TIMESTAMPS;

  onModuleInit() {
    this.$connect();
  }

  async create(createMesaDto: CreateMesaActualDto) {
    const mesa: Mesa = await this.mesa.findFirst({
      where: { id: createMesaDto.mesa_id },
    });

    if (!mesa) throw new BadRequestException('Mesa inexistente');

    const cantidad = await this.mesa_actual.count({
      where: { mesa_id: createMesaDto.mesa_id },
    });

    const mesaActual = {
      ...createMesaDto,
      nombre: `${mesa.nombre}/${cantidad + 1}`,
    };

    return this.mesa_actual.create({ data: mesaActual });
  }

  findAll() {
    return this.mesa_actual.findMany({
      include: {
        mesa: { ...this.OMIT_TIMESTAMPS },
        productos: { ...this.OMIT_TIMESTAMPS },
      },
      ...this.OMIT_TIMESTAMPS,
    });
  }

  async findOne(id: string) {
    const mesa = await this.mesa_actual.findFirst({
      where: { id },
      include: {
        mesa: { ...this.OMIT_TIMESTAMPS },
        productos: { ...this.OMIT_TIMESTAMPS },
      },
      ...this.OMIT_TIMESTAMPS,
    });

    if (!mesa) throw new NotFoundException('Mesa actual inexistente');

    return mesa;
  }

  async update(id: string, updateMesaDto: UpdateMesaActualDto) {
    const mesa = await this.mesa_actual.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa actual inexistente');

    return this.mesa_actual.update({ data: updateMesaDto, where: { id } });
  }

  async remove(id: string) {
    const mesa = await this.mesa_actual.findFirst({ where: { id } });

    if (!mesa) throw new NotFoundException('Mesa actual inexistente');

    return this.mesa_actual.delete({ where: { id } });
  }
}
