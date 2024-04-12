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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import UserEntity from './user.entity';

@Controller('User')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/hello')
  @ApiOperation({ summary: 'Get Hello Message' })
  @ApiResponse({ status: 200, description: 'Get a simple hello message' })
  getHello() {
    return this.userService.getHello();
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserEntity],
  })
  @Get('/user')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Fetch a single user',
    type: UserEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: 'string',
  })
  @Get('/user/:id')
  getUserByID(@Param('id') id: string) {
    return this.userService.getUserByID(Number(id));
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: createUserDto,
    description: 'The data needed to create a new user',
  })
  @ApiResponse({ status: 201, description: 'User created', type: UserEntity })
  @Post('/user')
  async createUser(@Body() post: createUserDto) {
    return this.userService.createUser(post);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    type: 'string',
  })
  @ApiBody({
    type: updateUserDto,
    description: 'The data needed to update the user',
  })
  @ApiResponse({ status: 200, description: 'User updated', type: UserEntity })
  @Put('/user/:id')
  async updateUser(@Body() post: updateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(Number(id), post);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete',
    type: 'string',
  })
  @Delete('/user/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
