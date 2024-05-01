import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class authorDto {
  @ApiProperty({ description: "Author's ID", example: 1 })
  public id: number;

  @ApiProperty({ description: "Author's first name", example: 'John' })
  public firstName: string;

  @ApiProperty({ description: "Author's second name", example: 'Doe' })
  public secondName: string;

  @ApiProperty({
    description: 'List of books written by the author',
  })
  @Transform(({ obj }) => obj.books.map((book) => book.id))
  public books?: number[];
}
