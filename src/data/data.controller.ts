import { Controller, Get, Param  } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(id);
  }
}
