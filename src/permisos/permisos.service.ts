import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class PermisosService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  findAll() {}

  update(id: number, updatePermisoDto: UpdatePermisoDto) {}

  async validate(data: any) {
    try {
      const permiso = await this.permiso.findFirst({
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
    const roles = await this.rol.findMany();

    const rolesWithDetails = roles.map((role) => ({
      rol_id: role.id,
      entidad,
      handler,
      activo: false,
    }));

    return await this.permiso.createMany({ data: rolesWithDetails });
  }
}
