import { Module } from '@nestjs/common';
import { AreaMesaService } from './area_mesa.service';
import { AreaMesaController } from './area_mesa.controller';

@Module({
  controllers: [AreaMesaController],
  providers: [AreaMesaService],
})
export class AreaMesaModule {}
