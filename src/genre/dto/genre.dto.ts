import { ApiProperty } from '@nestjs/swagger';

export class genreDto {
  @ApiProperty({
    description: 'Unique identifier for the genre',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: 'Name of the genre',
    example: 'Science Fiction',
  })
  public name: string;
}
