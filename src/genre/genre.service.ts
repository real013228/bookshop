import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateGenreDto } from './dto/update-genre.dto';
import { createGenreDto } from './dto/create-genre.dto';
import GenreEntity from './genre.entity';

@Injectable()
export class GenreService {
  getHello(): string {
    return 'Hello World!';
  }
  private lastGenreID = 0;
  private genres: GenreEntity[] = [];

  getAllGenres() {
    return this.genres;
  }

  getGenreByID(id: number) {
    const genre = this.genres.find((genre) => genre.id === id);
    if (genre) {
      return genre;
    }
    throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
  }

  updateGenre(id: number, genre: updateGenreDto) {
    console.log('replace genre', id, genre.name);
    throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
  }

  createGenre(genre: createGenreDto) {
    const newGenre = {
      id: this.lastGenreID,
      name: genre.name,
    };
    this.lastGenreID++;
    this.genres.push(newGenre);
    return newGenre;
  }

  deleteGenre(id: number) {
    const genreIndex = this.genres.findIndex((genre) => genre.id === id);
    if (genreIndex > -1) {
      this.genres.splice(genreIndex, 1);
    } else {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }
  }
}
