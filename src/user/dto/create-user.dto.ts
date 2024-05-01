import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({ description: "User's full name", example: 'John Doe' })
  @IsString()
  public name: string;

  @ApiProperty({ description: "User's password", example: 'securePa$$w0rd' })
  @IsString()
  @MinLength(8)
  public password: string;
}
