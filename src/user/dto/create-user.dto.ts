import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public secondName: string;
}
