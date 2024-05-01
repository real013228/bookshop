import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateGenreDto } from './dto/update-genre.dto';
import { createGenreDto } from './dto/create-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Genre from './genre.entity';
import {plainToClass} from "class-transformer";
import {genreDto} from "./dto/genre.dto";

@Injectable()
export class GenreService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  async getAllGenres() {
    const genres = await this.genresRepository.find();
    return genres.map((genre) => plainToClass(genreDto, genre));
  }

  async getGenreByID(id: number) {
    const genre = await this.genresRepository.findOne({ where: { id: id } });
    if (genre) {
      return plainToClass(genreDto, genre);
    }
    throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
  }

  async updateGenre(id: number, genreDTO: updateGenreDto) {
    const genre = await this.genresRepository.findOneBy({ id });
    if (!genre) {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }

    if (genreDTO.name) {
      genre.name = genreDTO.name;
    }

    await this.genresRepository.save(genre);
    return plainToClass(genreDto, genre);
  }

  async createGenre(genreDTO: createGenreDto) {
    const genre = new Genre();
    genre.name = genreDTO.name;

    await this.genresRepository.save(genre);
    return plainToClass(genreDto, genre);
  }

  async deleteGenre(id: number) {
    const deleteResponse = await this.genresRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
