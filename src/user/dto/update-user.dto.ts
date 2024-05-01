import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class updateUserDto {
  @ApiPropertyOptional({
    description: "User's updated email address",
    example: 'new.email@example.com',
  })
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiPropertyOptional({
    description: "User's updated full name",
    example: 'Johnathan Doe',
  })
  @IsOptional()
  @IsString()
  public name?: string;

  @ApiPropertyOptional({
    description: "User's updated password",
    example: 'newSecurePa$$w0rd',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  public password?: string;
}
