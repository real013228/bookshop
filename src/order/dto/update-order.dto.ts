import { ApiProperty } from '@nestjs/swagger';

export class updateOrderDto {
  @ApiProperty()
  public books?: number[];
}
