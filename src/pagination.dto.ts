import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'The number of the page to retrieve',
    example: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
    default: 10,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;
}
