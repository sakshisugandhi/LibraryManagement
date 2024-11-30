import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  fullName : string;

  @IsEmail()
  @IsNotEmpty()
  email : string;

  role_type:string;

  @IsString()
  @IsNotEmpty()
  password : string;

}