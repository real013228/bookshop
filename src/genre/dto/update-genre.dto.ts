import { ApiProperty } from '@nestjs/swagger';

export class updateGenreDto {
  @ApiProperty()
  public name?: string;
}
