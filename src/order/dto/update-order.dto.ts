import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, ArrayNotEmpty } from 'class-validator';

export class updateOrderDto {
  @ApiPropertyOptional({
    description: 'Updated list of book IDs in the order',
    example: [2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  public bookIds?: number[];
}
