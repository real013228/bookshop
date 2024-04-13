import { ApiProperty } from '@nestjs/swagger';

export class updateAuthorDto {
  @ApiProperty()
  public firstName?: string;
  @ApiProperty()
  public secondName?: string;
}
