import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/user/hello')
  getHello() {
    return this.userService.getHello();
  }
  @Get('/user')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/user/:id')
  getUserByID(@Param('id') id: string) {
    return this.userService.getUserByID(Number(id));
  }
  @Post('/user')
  async createUser(@Body() post: createUserDto) {
    return this.userService.createUser(post);
  }

  @Put('/user/:id')
  async updateUser(@Body() post: updateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(Number(id), post);
  }

  @Delete('/user/:id')
  async deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(Number(id));
  }
}
