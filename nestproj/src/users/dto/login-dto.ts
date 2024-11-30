import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';


export class LoginDTO {


  @IsEmail()
  @IsNotEmpty()
  email : string;


  @IsString()
  @IsNotEmpty()
  password : string;

}