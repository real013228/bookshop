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
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find({ relations: ['orders'] });
    return users.map((user) => plainToClass(userDto, user));
  }

  async getUserByID(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (user) {
      return plainToClass(userDto, user);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async updateUser(id: number, userDTO: updateUserDto) {
    const result = await this.usersRepository.update(id, userDTO);
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    return plainToClass(userDto, updatedUser);
  }

  async createUser(createUserDto: createUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return plainToClass(userDto, newUser);
  }

  async deleteUser(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
