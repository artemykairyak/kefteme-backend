import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { sendOkResponse } from '../utils/utils';

@Injectable()
export class TypesService {
  constructor(@InjectRepository(Type) private repo: Repository<Type>) {}

  async create(createTypeDto: CreateTypeDto) {
    try {
      await this.repo.insert(createTypeDto);

      return sendOkResponse(
        `Type with id ${createTypeDto.id} was successfully created`,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.repo.find();
  }

  async remove(id: string) {
    await this.repo.delete(id);

    return sendOkResponse(`Type with id ${id} was successfully deleted`);
  }
}
