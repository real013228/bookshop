import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateUserDto } from './dto/update-user.dto';
import { createUserDto } from './dto/create-user.dto';
import UserEntity from './user.entity';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  private lastUserID = 0;
  private users: UserEntity[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserByID(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  updateUser(id: number, user: updateUserDto) {
    console.log('replace user', id, user.firstName);
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  createUser(user: createUserDto) {
    const newUser = {
      id: this.lastUserID,
      firstName: user.firstName,
      secondName: user.secondName,
      orders: user.orders,
    };
    this.lastUserID++;
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
