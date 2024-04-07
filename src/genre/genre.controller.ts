import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Get('/genre/hello')
  getHello() {
    return this.genreService.getHello();
  }
}
