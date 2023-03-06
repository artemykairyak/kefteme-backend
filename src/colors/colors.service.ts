import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
  constructor(@InjectRepository(Color) private repo: Repository<Color>) {}

  create(createColorDto: CreateColorDto) {
    const newColor = this.repo.create(createColorDto);

    return this.repo.save(newColor);
  }

  findAll() {
    return this.repo.find();
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
