import { ApiProperty } from '@nestjs/swagger';
import Book from '../../book/book.entity';

export class updateAuthorDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public secondName: string;
  @ApiProperty()
  public books: Book;
}
