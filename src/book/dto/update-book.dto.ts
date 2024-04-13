import { ApiProperty } from '@nestjs/swagger';

export class updateBookDto {
  @ApiProperty()
  public title?: string;
  @ApiProperty()
  public description?: string;
  @ApiProperty()
  public price?: number;
  @ApiProperty()
  public genres?: number[];
}
