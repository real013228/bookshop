import { ApiProperty } from '@nestjs/swagger';

export class createAuthorDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public secondName: string;
}
