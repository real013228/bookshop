import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class createAuthorDto {
  @ApiProperty({ description: "Author's first name", example: 'John' })
  @IsString()
  @Length(1, 50)
  public firstName: string;

  @ApiProperty({ description: "Author's second name", example: 'Doe' })
  @IsString()
  @Length(1, 50)
  public secondName: string;
}
