import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  MaxLength,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class updateBookDto {
  @ApiPropertyOptional({
    description: 'Updated title of the book',
    example: 'The Universe in a Nutshell',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  public title?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the book',
    example: 'An exploration of quantum mechanics.',
  })
  @IsOptional()
  @IsString()
  public description?: string;

  @ApiPropertyOptional({
    description: 'Updated price of the book',
    example: 17.99,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'List of genre IDs associated with the book',
    type: [Number],
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  public genres?: number[];
}
