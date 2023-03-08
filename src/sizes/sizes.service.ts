import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';
import { sendOkResponse } from '../utils/utils';

@Injectable()
export class SizesService {
  constructor(@InjectRepository(Size) private repo: Repository<Size>) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      await this.repo.insert(createSizeDto);
      return sendOkResponse(
        `Size with id ${createSizeDto.id} was successfully created`,
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

    return sendOkResponse(`Size with id ${id} was successfully deleted`);
  }
}
