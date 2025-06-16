import { Module } from '@nestjs/common';
import { MesaProductosService } from './mesa-productos.service';
import { MesaProductosController } from './mesa-productos.controller';

@Module({
  controllers: [MesaProductosController],
  providers: [MesaProductosService],
})
export class MesaProductosModule {}
