import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizesService {
  constructor(@InjectRepository(Size) private repo: Repository<Size>) {}

  create(createSizeDto: CreateSizeDto) {
    const newSize = this.repo.create(createSizeDto);

    return this.repo.save(newSize);
  }

  findAll() {
    return this.repo.find();
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
