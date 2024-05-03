import { IsNotEmpty, IsString } from 'class-validator';

export class FindOrdersDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
