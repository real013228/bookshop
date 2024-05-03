import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body, UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { createAuthorDto } from './dto/create-author.dto';
import { updateAuthorDto } from './dto/update-author.dto';
import Author from './author.entity';
import {authorDto} from "./dto/author.dto";
import {RolesGuard} from "../role/roles.guard";

@ApiTags('Author')
@Controller('Author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all authors' })
  @ApiResponse({
    status: 200,
    description: 'List of all authors',
    type: [authorDto],
  })
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Author details',
    type: authorDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author to retrieve',
    type: 'number',
  })
  getAuthorByID(@Param('id') id: string) {
    return this.authorService.getAuthorByID(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({
    type: createAuthorDto,
    description: 'Data for creating a new author',
  })
  @ApiResponse({
    status: 201,
    description: 'Author created successfully',
    type: authorDto,
  })
  @UseGuards(new RolesGuard(['admin']))
  async createAuthor(@Body() post: createAuthorDto) {
    return this.authorService.createAuthor(post);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing author' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author to update',
    type: 'number',
  })
  @ApiBody({
    type: updateAuthorDto,
    description: 'Data for updating an existing author',
  })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully',
    type: authorDto,
  })
  @UseGuards(new RolesGuard(['admin']))
  async updateAuthor(@Body() post: updateAuthorDto, @Param('id') id: string) {
    return this.authorService.updateAuthor(Number(id), post);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author to delete',
    type: 'number',
  })
  @ApiResponse({
    status: 204,
    description: 'Author deleted successfully',
  })
  @UseGuards(new RolesGuard(['admin']))
  async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(Number(id));
  }
}
