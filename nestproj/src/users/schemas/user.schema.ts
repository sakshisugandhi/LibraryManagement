import { Schema , Prop, SchemaFactory} from "@nestjs/mongoose";
import { timeStamp } from "console";
import { Document } from "mongoose";
import mongoose from "mongoose";

export enum role_type  {
    ADMIN = "ADMIN",
    VENDOR = "VENDOR"
  
  }


@Schema({
    timestamps : true,
})
export class User{
    @Prop({required : true})
    fullName : string;

    @Prop({required : true})
    email : string;


    @Prop({required : true})
    password : string;

    @Prop({
        type: String,
        default: 'VENDOR',
        enum: ['VENDOR', 'ADMIN'],
        })
        role_type  : string;
    
}

export type UserDocument = User & Document;

const schema = SchemaFactory.createForClass(User);

export const UserSchema = schema;

