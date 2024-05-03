import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { userDto } from './dto/user.dto';
import { PaginationDto } from '../pagination.dto';
import {RolesGuard} from "../role/roles.guard";

@Controller('User')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [userDto],
  })
  @Get()
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const users = await this.userService.getAllUsers({
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }

  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Fetch a single user',
    type: userDto,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: 'string',
  })
  @Get('/:id')
  getUserByID(@Param('id') id: string) {
    return this.userService.getUserByID(Number(id));
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: createUserDto,
    description: 'The data needed to create a new user',
  })
  @ApiResponse({ status: 201, description: 'User created', type: userDto })
  @Post()
  @UseGuards(new RolesGuard(['admin']))
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
  @ApiResponse({ status: 200, description: 'User updated', type: userDto })
  @Put('/:id')
  @UseGuards(new RolesGuard(['admin']))
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
  @Delete('/:id')
  @UseGuards(new RolesGuard(['admin']))
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
