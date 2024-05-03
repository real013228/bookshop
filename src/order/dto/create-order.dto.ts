import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsNumber, ArrayNotEmpty, IsNotEmpty, IsString} from 'class-validator';

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
    description: 'email of the user placing the order',
    example: 'rere@mail.ru',
  })
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
