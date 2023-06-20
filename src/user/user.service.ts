import { Inject, Injectable } from '@nestjs/common';
import { AddUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.mongo.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: MongoRepository<User>,
  ) {}

  create(user) {
    return this.UserRepository.save(user);
  }
}
