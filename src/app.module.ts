import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from '@src/app.controller';
import { config } from '@src/config';
import { AreasModule } from './areas/areas.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { MesaProductosModule } from './mesa-productos/mesa-productos.module';
import { MesasActualesModule } from './mesas-actuales/mesas-actuales.module';
import { MesasModule } from './mesas/mesas.module';
import { PermisosModule } from './permisos/permisos.module';
import { ProductosModule } from './productos/productos.module';
import { RolesModule } from './roles/roles.module';
import { SubtiposProductoModule } from './subtipos-producto/subtipos-producto.module';
import { TicketsModule } from './tickets/tickets.module';
import { TiposProductoModule } from './tipos-producto/tipos-producto.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ThrottlerBehindProxyGuard } from './utils';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => await config.get('cache'),
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('throttle.active')
          ? config.get('throttle.list')
          : [{ ttl: 0, limit: 0 }],
    }),
    TerminusModule,
    UsuariosModule,
    ProductosModule,
    MesasModule,
    TiposProductoModule,
    MesaProductosModule,
    SubtiposProductoModule,
    RolesModule,
    PermisosModule,
    AuthModule,
    TicketsModule,
    MesasActualesModule,
    AreasModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
