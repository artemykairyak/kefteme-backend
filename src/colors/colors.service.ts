import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { sendOkResponse } from '../utils/utils';

@Injectable()
export class ColorsService {
  constructor(@InjectRepository(Color) private repo: Repository<Color>) {}

  async create(createColorDto: CreateColorDto) {
    try {
      await this.repo.insert(createColorDto);
      return sendOkResponse(
        `Color with id ${createColorDto.id} was successfully created`,
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

    return sendOkResponse(`Color with id ${id} was successfully deleted`);
  }
}
