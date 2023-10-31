import {
    IsEmail,
    IsNotEmpty,
    Matches,
    IsString,
    MaxLength,
    MinLength,
    IsLowercase,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UserDetailsDto {
    @ApiProperty({ title: 'User unique email-id' })
    @IsEmail({}, { message: 'LOGIN_EMAIL' })
    @IsLowercase({ message: 'USER_EMAIL' })
    @IsNotEmpty({ message: 'LOGIN_EMAIL' })
    email: string;
  
    @ApiProperty({ title: 'User name' })
    @IsString({ message: 'USER_NAME' })
    @MaxLength(12, { message: 'USER_NAME' })
    @IsNotEmpty({ message: 'EMPTY_USER_NAME' })
    @Matches(/^[a-zA-Z0-9]+$/, {
      message: 'USER_NAME',
    })
    userName: string;
  }
  