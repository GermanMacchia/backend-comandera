import { Module } from '@nestjs/common';
import { SubtiposProductoController } from './subtipos-producto.controller';
import { SubtiposProductoService } from './subtipos-producto.service';

@Module({
  controllers: [SubtiposProductoController],
  providers: [SubtiposProductoService],
})
export class SubtiposProductoModule {}
