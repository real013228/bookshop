import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, MaxLength, IsNotEmpty, IsArray } from 'class-validator';

export class createBookDto {
  @ApiProperty({ description: 'Title of the book', example: 'A Brief History of Time' })
  @IsString()
  @MaxLength(100)
  public title: string;

  @ApiProperty({ description: 'Detailed description of the book', example: 'A popular-science book on cosmology.' })
  @IsString()
  public description: string;

  @ApiProperty({ description: 'Author ID for the book', example: 1 })
  @IsNumber()
  @Min(1)
  public authorId: number;

  @ApiProperty({ description: 'Price of the book in USD', example: 15.99 })
  @IsNumber()
  @Min(0)
  public price: number;

  @ApiProperty({ description: 'List of genre IDs associated with the book', type: [Number], example: [1, 2] })
  @IsArray()
  @IsNotEmpty()
  public genres: number[];
}