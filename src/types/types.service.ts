import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(@InjectRepository(Type) private repo: Repository<Type>) {}

  create(createTypeDto: CreateTypeDto) {
    const newType = this.repo.create(createTypeDto);

    return this.repo.save(newType);
  }

  findAll() {
    return this.repo.find();
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
