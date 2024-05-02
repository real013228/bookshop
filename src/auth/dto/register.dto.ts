import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class registerDto {
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'user@example.com'
  })
  @IsEmail({}, { message: 'Invalid email address provided.' })
  email: string;

  @ApiProperty({
    description: 'The password for the account. Must be at least 6 characters.',
    example: 'securePassword123',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}