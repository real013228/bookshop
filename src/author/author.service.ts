import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateAuthorDto } from './dto/update-author.dto';
import { createAuthorDto } from './dto/create-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Author from './author.entity';
import { plainToClass } from 'class-transformer';
import { authorDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async getAllAuthors() {
    const authors = await this.authorsRepository.find();
    return authors.map((author) => plainToClass(authorDto, author));
  }

  async getAuthorByID(id: number) {
    const author = await this.authorsRepository.findOne({ where: { id: id } });
    if (author) {
      return plainToClass(authorDto, author);
    }
    throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
  }

  async updateAuthor(id: number, authDto: updateAuthorDto) {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    author.firstName = authDto.firstName || author.firstName;
    author.secondName = authDto.secondName || author.secondName;

    await this.authorsRepository.save(author);

    const authEntity = this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    return plainToClass(authorDto, authEntity);
  }

  async createAuthor(author: createAuthorDto) {
    const newAuthor = this.authorsRepository.create(author);
    await this.authorsRepository.save(newAuthor);
    return plainToClass(authorDto, newAuthor);
  }

  async deleteAuthor(id: number) {
    const deleteResponse = await this.authorsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
  }
}
