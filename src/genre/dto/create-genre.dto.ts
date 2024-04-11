import { ApiProperty } from '@nestjs/swagger';

export class createGenreDto {
  @ApiProperty()
  public name: string;
}
