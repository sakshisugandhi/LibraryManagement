import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    description: string;


    category: string;


    ISBN: number;


    image?: string;

}