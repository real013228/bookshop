import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get('/author/hello')
  getHello() {
    return this.authorService.getHello();
  }
}
