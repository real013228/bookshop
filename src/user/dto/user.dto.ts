import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class userDto {
  @ApiProperty({ description: "User's ID" })
  public id: number;

  @ApiProperty({ description: "User's email address" })
  public email: string;

  @ApiProperty({ description: "User's name" })
  public name: string;

  @ApiProperty({ description: "List of user's orders" })
  @Transform(({ obj }) => obj.orders.map((order) => order.id))
  public orders: number[];
}
