import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty()
  public firstName?: string;
  @ApiProperty()
  public secondName?: string;
}
