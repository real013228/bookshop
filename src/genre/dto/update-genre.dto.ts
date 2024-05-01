import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class updateGenreDto {
  @ApiPropertyOptional({
    description: 'Updated name of the genre',
    example: 'Fantasy',
  })
  @IsOptional()
  @IsString()
  @Length(3, 50) // Same validation as creation to maintain consistency
  public name?: string;
}
