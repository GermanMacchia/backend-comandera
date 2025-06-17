import { Injectable } from '@nestjs/common';
import { CreateAreaMesaDto } from './dto/create-area_mesa.dto';
import { UpdateAreaMesaDto } from './dto/update-area_mesa.dto';

@Injectable()
export class AreaMesaService {
  create(createAreaMesaDto: CreateAreaMesaDto) {
    return 'This action adds a new areaMesa';
  }

  findAll() {
    return `This action returns all areaMesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} areaMesa`;
  }

  update(id: number, updateAreaMesaDto: UpdateAreaMesaDto) {
    return `This action updates a #${id} areaMesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} areaMesa`;
  }
}
