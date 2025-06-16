import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-role.dto';

@Injectable()
export class RolesService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  create(createRolDto: CreateRolDto) {
    return this.rol.create({ data: createRolDto });
  }

  findAll() {
    return this.rol.findMany();
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.rol.findFirst({ where: { id } });

    if (!rol) throw new NotFoundException('Rol inexistente');

    return this.rol.update({ data: updateRolDto, where: { id } });
  }

  async remove(id: number) {
    const rol = await this.rol.findFirst({ where: { id } });

    if (!rol) throw new NotFoundException('Rol inexistente');

    return this.rol.delete({ where: { id } });
  }
}
