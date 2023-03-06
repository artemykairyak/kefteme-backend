import { Injectable } from '@nestjs/common';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({where: {id}})
  }

  createUser(user: CreateUserDto) {
    const newUser = this.repo.create(user);

    return this.repo.save(newUser);
  }
}
