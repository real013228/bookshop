import { ApiProperty } from '@nestjs/swagger';

export class createBookDto {
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description?: string;
  @ApiProperty()
  public authorID: number;
  @ApiProperty()
  public price: number;
  @ApiProperty()
  public genresID?: number[];
}
