import { Injectable, Body, BadRequestException, ServiceUnavailableException, NotFoundException, UnauthorizedException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-dto';
import { Response, response } from 'express';
import { Types } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }



  async create(createUserDto: CreateUserDTO): Promise<{ success: boolean; data: User }> {
    const { fullName, email, role_type, password } = createUserDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new this.userModel({
      fullName,
      email,
      role_type,
      password: hashedPassword,
    });

    const createdUser = await user.save();

    return { success: true, data: createdUser };
  }

  async login(loginDTO: LoginDTO): Promise<{ success: boolean; message?: string; token?: string }> {
    const { email, password } = loginDTO;
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return {
        success: false,
        message: "Password doesn't match!",
      };
    }

    const token = this.jwtService.sign({ id: user._id });
    return {
      success: true,
      token,
    };
  }

  async findById(token: string): Promise<{ success: boolean; users?: User }> {
    try {
      const secretKey = 'SAKSHI_SUGANDHI';

      const user = this.decodeToken(token, secretKey);
      console.log(user, "<<<<<");

      const isUser = await this.userModel.findById(user.id).exec();
      console.log(isUser, "user")
      if (!isUser) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        users: isUser
      };
    }
    catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
  }

  decodeToken(token: string, secretKey: string): { id?: string; success: boolean } {
    try {
      const decodedToken = this.jwtService.verify(token, { secret: secretKey });
      // console.log(decodedToken );
      return decodedToken;
    } catch (error) {
      console.error(`Error decoding token: ${error}`);
      return { success: false };
    }
  }

  async findUsers(token: string): Promise<{ success: boolean; users?: User[] }> {
    try {
      const secretKey = 'SAKSHI_SUGANDHI';

      const user = this.decodeToken(token, secretKey);
      console.log(user, "<<<<<");

      const AllUser = await this.userModel.find({role_type:'VENDOR'});
      console.log(AllUser)
  
      return {
        success: true,
        users: AllUser
      };
    }
    catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
  }
}







