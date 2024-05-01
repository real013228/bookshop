import { ApiProperty } from '@nestjs/swagger';
import { authorDto } from '../../author/dto/author.dto'; // Assuming the authorDto and genreDto are defined
import { Transform } from 'class-transformer';

export class bookDto {
  @ApiProperty({ description: 'ID of the book', example: 1 })
  public id: number;

  @ApiProperty({
    description: 'Title of the book',
    example: 'A Brief History of Time',
  })
  public title: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'A popular-science book on cosmology.',
  })
  public description: string;

  @ApiProperty({ description: 'Author of the book', type: authorDto })
  @Transform(({ obj }) => obj.author.id)
  public author: number;

  @ApiProperty({ description: 'Price of the book in USD', example: 15.99 })
  public price: number;

  @ApiProperty({
    description: 'Genres associated with the book',
    isArray: true,
  })
  @Transform(({ obj }) => obj.books.map((genre) => genre.id))
  public genres: number[];
}
