import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { PUBLIC_KEY } from '@src/interfaces/decorators';
import { PermisosService } from '@src/permisos/permisos.service';

@Injectable()
export class RolesAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private permisosService: PermisosService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const handlerName = context.getHandler().name;
    const className = context.getClass().name;

    return await this.permisosService.validate({
      rol_id: request.user.rol.id,
      handler: handlerName,
      entidad: className.replace(/Controller$/, ''),
    });
  }

  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error || new UnauthorizedException();
    }
    return user;
  }
}
