import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateGenreDto } from './dto/update-genre.dto';
import { createGenreDto } from './dto/create-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Genre from './genre.entity';

@Injectable()
export class GenreService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  getAllGenres() {
    return this.genresRepository.find();
  }

  async getGenreByID(id: number) {
    const genre = await this.genresRepository.findOne({ where: { id: id } });
    if (genre) {
      return genre;
    }
    throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
  }

  async updateGenre(id: number, genreDto: updateGenreDto) {
    const genre = await this.genresRepository.findOneBy({ id });
    if (!genre) {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }

    if (genreDto.name) {
      genre.name = genreDto.name;
    }

    await this.genresRepository.save(genre);
    return genre;
  }

  async createGenre(genreDto: createGenreDto) {
    const genre = new Genre();
    genre.name = genreDto.name;

    await this.genresRepository.save(genre);
    return genre;
  }

  async deleteGenre(id: number) {
    const deleteResponse = await this.genresRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
