import { ApiProperty } from '@nestjs/swagger';
import Book from '../../book/book.entity';
import User from '../../user/user.entity';

export class createOrderDto {
  @ApiProperty()
  public books: Book[];
  @ApiProperty()
  public totalPrice: number;
  @ApiProperty()
  public user: User;
}
