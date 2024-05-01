import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class createOrderDto {
  @ApiProperty({
    description: 'IDs of the books included in the order',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  public bookIds: number[];

  @ApiProperty({
    description: 'Total price of the order in USD',
    example: 59.99,
  })
  @IsNumber()
  @IsNotEmpty()
  public totalPrice: number;

  @ApiProperty({
    description: 'ID of the user placing the order',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  public userId: number;
}
