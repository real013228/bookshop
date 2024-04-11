import { ApiProperty } from '@nestjs/swagger';
import Order from '../../order/order.entity';

export class updateUserDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public secondName: string;
  @ApiProperty()
  public orders: Order[];
}
