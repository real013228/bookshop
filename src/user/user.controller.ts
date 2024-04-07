import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/user/hello')
  getHello() {
    return this.userService.getHello();
  }
}
