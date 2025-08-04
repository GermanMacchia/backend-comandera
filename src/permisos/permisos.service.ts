import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class PermisosService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  findAll() {}

  update(id: string, updatePermisoDto: UpdatePermisoDto) {}

  async validate(data: any) {
    try {
      const permiso = await this.permisos.findFirst({
        select: {
          activo: true,
        },
        where: data,
      });

      if (!permiso) {
        await this.createBulk(data);
        return false;
      }

      return !!permiso.activo;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createBulk({ entidad, handler }) {
    const roles = await this.roles.findMany();

    const rolesWithDetails = roles.map((role) => ({
      rol_id: role.id,
      entidad,
      handler,
      activo: false,
    }));

    return await this.permisos.createMany({ data: rolesWithDetails });
  }
}
