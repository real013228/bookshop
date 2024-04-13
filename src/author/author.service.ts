import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateAuthorDto } from './dto/update-author.dto';
import { createAuthorDto } from './dto/create-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Author from './author.entity';

@Injectable()
export class AuthorService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  getAllAuthors() {
    return this.authorsRepository.find();
  }

  async getAuthorByID(id: number) {
    const author = await this.authorsRepository.findOne({ where: { id: id } });
    if (author) {
      return author;
    }
    throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
  }

  async updateAuthor(id: number, authorDto: updateAuthorDto) {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    author.firstName = authorDto.firstName || author.firstName;
    author.secondName = authorDto.secondName || author.secondName;

    await this.authorsRepository.save(author); // Save changes in the transaction

    return this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async createAuthor(author: createAuthorDto) {
    const newAuthor = this.authorsRepository.create(author);
    await this.authorsRepository.save(newAuthor);
    return newAuthor;
  }

  async deleteAuthor(id: number) {
    const deleteResponse = await this.authorsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
  }
}
