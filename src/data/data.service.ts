import { Injectable } from '@nestjs/common';


@Injectable()
export class DataService {
  findOne(id: string) {
    return `This action returns a #${id} datum`;
  }
}
