import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';

import { PermisosModule } from '@src/permisos/permisos.module';
import { UsuariosModule } from '@src/usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { RolesAuthGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    UsuariosModule,
    PermisosModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwt_secret'),
        signOptions: {
          expiresIn: configService.get<number>('app.jwt_expire'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesAuthGuard,
    },
  ],
})
export class AuthModule {}
