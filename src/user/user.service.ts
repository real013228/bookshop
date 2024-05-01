import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateUserDto } from './dto/update-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { plainToClass } from 'class-transformer';
import { userDto } from './dto/user.dto';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users.map((user) => plainToClass(userDto, user));
  }

  async getUserByID(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user) {
      return plainToClass(userDto, user);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async updateUser(id: number, user: updateUserDto) {
    const { affected } = await this.usersRepository.update(id, user);
    if (affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(
      userDto,
      this.usersRepository.findOne({ where: { id: id } }),
    );
  }

  async createUser(user: createUserDto) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return plainToClass(userDto, newUser);
  }

  async deleteUser(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
