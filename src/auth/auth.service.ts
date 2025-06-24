import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '@src/usuarios/usuarios.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuariosService.getByEmail(email);

    const isMatch = await bcrypt.compare(pass, user.clave);

    if (!(user && isMatch && user.activo && user.rol)) return;

    delete user.clave;
    return { ...user };
  }

  async login({ email, clave }) {
    const user = await this.validateUser(email, clave);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateToken(user);
  }

  async refresh(token: any) {
    try {
      token = token?.startsWith('Bearer ') ? token.slice(7) : token;

      const secret = this.config.get<string>('app.jwt_secret');
      const decodedToken = this.jwtService.verify(token, { secret });

      return this.generateToken(decodedToken);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async cambiarPassword(token: string, clave: string) {
    try {
      const decodedToken = await this.validarEmailToken(token);

      if (!decodedToken || decodedToken.rol.id) {
        throw new HttpException('No valid', HttpStatus.UNAUTHORIZED);
      }

      const entity = {
        clave,
        valido: 1,
      };
      return await this.usuariosService.update(decodedToken.id, entity);
    } catch (error) {
      throw error;
    }
  }

  async validarEmailToken(token: any) {
    try {
      token = token?.startsWith('Bearer ') ? token.slice(7) : token;

      const secret = this.config.get<string>('app.jwt_secret');

      return this.jwtService.verify(token, { secret });
    } catch {
      return false;
    }
  }

  generateToken(user: any) {
    const { email, id, rol } = user;

    const payload = { email, id, rol };

    const expire = this.config.get<number>('app.jwt_expire');
    return {
      access_token: this.jwtService.sign(payload),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + expire,
      user,
    };
  }
}
