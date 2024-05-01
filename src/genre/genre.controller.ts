import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { createGenreDto } from './dto/create-genre.dto';
import { updateGenreDto } from './dto/update-genre.dto';
import Genre from './genre.entity';
import {genreDto} from "./dto/genre.dto";

@Controller('genre')
@ApiTags('Genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/hello')
  @ApiOperation({ summary: 'Get hello message from Genre Service' })
  @ApiResponse({ status: 200, description: 'Hello message received' })
  getHello() {
    return this.genreService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all genres' })
  @ApiResponse({
    status: 200,
    description: 'List of all genres',
    type: [genreDto],
  })
  getAllGenres() {
    return this.genreService.getAllGenres();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a genre by ID' })
  @ApiResponse({ status: 200, description: 'Genre details', type: genreDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the genre to retrieve',
    type: 'integer',
  })
  getGenreByID(@Param('id') id: string) {
    return this.genreService.getGenreByID(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiBody({ type: createGenreDto, description: 'Data to create a new genre' })
  @ApiResponse({
    status: 201,
    description: 'Genre created successfully',
    type: genreDto,
  })
  async createGenre(@Body() post: createGenreDto) {
    return this.genreService.createGenre(post);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing genre' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the genre to be updated',
    type: 'integer',
  })
  @ApiBody({
    type: updateGenreDto,
    description: 'Data to update an existing genre',
  })
  @ApiResponse({
    status: 200,
    description: 'Genre updated successfully',
    type: genreDto,
  })
  async updateGenre(@Body() post: updateGenreDto, @Param('id') id: string) {
    return this.genreService.updateGenre(Number(id), post);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a genre' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the genre to delete',
    type: 'integer',
  })
  @ApiResponse({ status: 204, description: 'Genre deleted successfully' })
  async deleteGenre(@Param('id') id: string) {
    return this.genreService.deleteGenre(Number(id));
  }
}
