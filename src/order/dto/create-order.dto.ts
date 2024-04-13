import { ApiProperty } from '@nestjs/swagger';

export class createOrderDto {
  @ApiProperty()
  public booksID: number[];
  @ApiProperty()
  public userID: number;
}
