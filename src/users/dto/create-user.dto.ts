import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum UserRoles {
  'BASIC',
  'ADMIN',
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  @ApiProperty()
  role: string;
}
