import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags } from '@nestjs/swagger';
import { createGenreDto } from './dto/create-genre.dto';
import { updateGenreDto } from './dto/update-genre.dto';

@Controller()
@ApiTags('Genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Get('/genre/hello')
  getHello() {
    return this.genreService.getHello();
  }
  @Get('/genre')
  getAllGenres() {
    return this.genreService.getAllGenres();
  }
  @Get('/genre/:id')
  getGenreByID(@Param('id') id: string) {
    return this.genreService.getGenreByID(Number(id));
  }
  @Post('/genre')
  async createGenre(@Body() post: createGenreDto) {
    return this.genreService.createGenre(post);
  }

  @Put('/genre/:id')
  async updateGenre(@Body() post: updateGenreDto, @Param('id') id: string) {
    return this.genreService.updateGenre(Number(id), post);
  }

  @Delete('/genre/:id')
  async deleteGenre(@Param('id') id: string) {
    this.genreService.deleteGenre(Number(id));
  }
}
