import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() surname: string;
  @IsEmail() email: string;
  @IsString() @MinLength(8) @Matches(/\d/, { message: 'password must contain a number' })
  password: string;
}

export class LoginDto {
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() password: string;
}

export class ForgotPasswordDto {
  @IsEmail() email: string;
}