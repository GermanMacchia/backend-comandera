import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { OMIT_TIMESTAMPS } from '../interfaces/enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService extends PrismaClient implements OnModuleInit {
  OMIT_TIMESTAMPS = OMIT_TIMESTAMPS;

  onModuleInit() {
    this.$connect();
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.clave) {
      const salt = await bcrypt.genSalt();
      createUsuarioDto.clave = await bcrypt.hash(createUsuarioDto.clave, salt);
    }

    return this.usuario.create({
      data: createUsuarioDto,
      omit: { clave: true },
    });
  }

  findAll() {
    return this.usuario.findMany({
      omit: { clave: true, rol_id: true },
      include: { rol: { ...this.OMIT_TIMESTAMPS } },
    });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuario.findFirst({ where: { id } });

    if (updateUsuarioDto.clave) {
      const salt = await bcrypt.genSalt();
      updateUsuarioDto.clave = await bcrypt.hash(updateUsuarioDto.clave, salt);
    }

    if (!usuario) throw new NotFoundException('Usuario inexistente');

    return this.usuario.update({
      data: updateUsuarioDto,
      where: { id },
      omit: { ...OMIT_TIMESTAMPS.omit, clave: true },
    });
  }

  async remove(id: string) {
    const usuario = await this.usuario.findFirst({ where: { id } });

    if (!usuario) throw new NotFoundException('Usuario inexistente');

    return this.usuario.delete({
      where: { id },
      omit: { ...OMIT_TIMESTAMPS.omit, clave: true },
    });
  }

  getByEmail(email: string) {
    return this.usuario.findFirst({
      where: { email },
      omit: { ...OMIT_TIMESTAMPS.omit, rol_id: true },
      include: { rol: { ...OMIT_TIMESTAMPS } },
    });
  }
}
