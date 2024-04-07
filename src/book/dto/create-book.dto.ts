import { ApiProperty } from '@nestjs/swagger';
import Author from '../../author/author.entity';
import Genre from '../../genre/genre.entity';

export class createBookDto {
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public author: Author;
  @ApiProperty()
  public price: number;
  @ApiProperty()
  public genres: Genre[];
}
