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

  @ApiPropertyOptional({
    description: 'Updated total price of the order in USD',
    example: 49.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  public totalPrice?: number;
}
