import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { getUserWithoutPassword } from '../../utils/utils';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: CreateUserDto) {
    const newUser = await this.repo.create(user);
    await this.repo.save(newUser);

    return getUserWithoutPassword(newUser);
  }

  findAll() {
    return this.repo.find();
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    return getUserWithoutPassword(user);
  }
}
