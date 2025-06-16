import { Module } from '@nestjs/common';
import { MesasActualesService } from './mesas-actuales.service';
import { MesasActualesController } from './mesas-actuales.controller';

@Module({
  controllers: [MesasActualesController],
  providers: [MesasActualesService],
})
export class MesasActualesModule {}
