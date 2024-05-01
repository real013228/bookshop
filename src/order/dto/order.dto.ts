import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class orderDto {
  @ApiProperty({
    description: 'ID of the order',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: 'List of books included in the order',
  })
  @Transform(({ obj }) => obj.books.map((book) => book.id))
  public books: number[];

  @ApiProperty({
    description: 'Total price of the order in USD',
    example: 59.99,
  })
  public totalPrice: number;

  @ApiProperty({
    description: 'The user associated with the order',
  })
  @Transform(({ obj }) => obj.user.id)
  public user: number;
}
