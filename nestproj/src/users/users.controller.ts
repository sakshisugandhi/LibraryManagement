import { Controller, Get , Post , Body , Param , Put , Delete , Res , Headers , UnauthorizedException} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user-dto';
import { LoginDTO } from './dto/login-dto';
import { Response } from 'express';


@Controller('library')
export class UsersController {
    constructor(private userService:UsersService){}

@Post()
async create(@Body() createUserDto : CreateUserDTO ) {
    console.log(createUserDto , "createuserdto")
 return this.userService.create(createUserDto);
 
}

@Post('/login')
async login(@Body() loginDto : LoginDTO) : Promise <{success : boolean, message?: string, token?: string}>{
    
 return this.userService.login(loginDto);
 
}

@Get('/user')
async getUserById( @Headers() headers): Promise<{ success: boolean;user?: User}> {
    console.log(headers ," headers");
    console.log(headers.authorization , "auth");
    
    return this.userService.findById(headers['authorization']);
}

@Get('/alluser')
async getUsers( @Headers() headers): Promise<{ success: boolean;users?: User[]}> {
    console.log(headers ," headers");
    console.log(headers.authorization , "auth");
    
    return this.userService.findUsers(headers['authorization']);
}
}
