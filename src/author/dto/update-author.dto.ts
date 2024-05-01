import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class updateAuthorDto {
  @ApiPropertyOptional({
    description: "Updated author's first name",
    example: 'James',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  public firstName?: string;

  @ApiPropertyOptional({
    description: "Updated author's second name",
    example: 'Smith',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  public secondName?: string;
}
