import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { timeStamp } from "console";
import { Document, Types } from "mongoose";
import mongoose from "mongoose";
import { User } from "src/users/schemas/user.schema";

export enum status {
    SAVED = 'SAVED',
    DELETED = 'DELETED',
}

export enum availability {
    ISSUED = 'ISSUED',
    NOTISSUED = 'NOT ISSUED',
}


@Schema({
    timestamps: true,
})

export class Books {

    @Prop({ type: Types.ObjectId, ref: User.name })
    userid: Types.ObjectId


    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    ISBN: number;

    @Prop({
        type: String,
        default: 'SAVED',
        enum: ['SAVED', 'DELETED'],
    })
    status: string;

    @Prop({
        type: String,
        default: 'NOT ISSUED',
        enum: ['ISSUED', 'NOT ISSUED'],
    })
    availability: string;

    @Prop()
    image?: string;


}

export type BooksDocument = Books & Document;

const schema = SchemaFactory.createForClass(Books);

export const BooksSchema = schema;
