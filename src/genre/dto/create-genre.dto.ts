import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class createGenreDto {
  @ApiProperty({
    description: 'Name of the genre',
    example: 'Science Fiction',
  })
  @IsString()
  @Length(3, 50)
  public name: string;
}
