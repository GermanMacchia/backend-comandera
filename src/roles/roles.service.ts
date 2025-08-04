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
    return this.roles.create({ data: createRolDto });
  }

  findAll() {
    return this.roles.findMany();
  }

  async update(id: string, updateRolDto: UpdateRolDto) {
    const rol = await this.roles.findFirst({ where: { id } });

    if (!rol) throw new NotFoundException('Rol inexistente');

    return this.roles.update({ data: updateRolDto, where: { id } });
  }

  async remove(id: string) {
    const rol = await this.roles.findFirst({ where: { id } });

    if (!rol) throw new NotFoundException('Rol inexistente');

    return this.roles.delete({ where: { id } });
  }
}
