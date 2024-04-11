import { ApiProperty } from '@nestjs/swagger';
import Order from '../../order/order.entity';

export class createUserDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public secondName: string;
  @ApiProperty()
  public orders: Order[];
}
