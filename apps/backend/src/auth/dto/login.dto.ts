import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  email: string;
  password: string;
}
