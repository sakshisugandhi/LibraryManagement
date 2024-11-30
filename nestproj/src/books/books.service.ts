import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { BooksDocument } from './schemas/books.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schemas/books.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-books-dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

let { ObjectId } = mongoose.Types

@Injectable()
export class BooksService {
        constructor(
            @InjectModel(Books.name) private readonly BooksModel: Model<BooksDocument>,
            private jwtService: JwtService, private userService: UsersService) { }

    async create(createUserDto: CreateUserDTO): Promise<{ success: boolean; data: Books }> {
        const { title, description, category, ISBN, image } = createUserDto;
        if (!title || !description) {
            throw new BadRequestException('Title and description are required');
        }
        // console.log(user, "user")
        const book = new this.BooksModel({
            //   userid : new ObjectId(user.id),
            title,
            description,
            category,
            ISBN,
            image
        });
        const createdBook = await book.save();
        return { success: true, data: createdBook };
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

    async findAll(): Promise<Books[]> {
        return await this.BooksModel.find({status : "SAVED"}).exec();
    }

    async getbookById(token: string, bookId: string): Promise<{ success: boolean; data: Books }> {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = this.decodeToken(token, secretKey);
        const book = await this.BooksModel.findById(bookId);
        if (!book) {
            throw new NotFoundException('Book Not Found');
        }
        return { success: true, data: book };
    }

    async remove(token: string, bookId: string): Promise<{ success: boolean; data: { _id: string } }> {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = this.decodeToken(token, secretKey);
        const deletedBook = await this.BooksModel.findByIdAndDelete(bookId);
        console.log(deletedBook)
        console.log(bookId, "bookid")
        if (!deletedBook) {
            throw new NotFoundException('Book Not Found');
        }
        return { success: true, data: { _id: bookId } };
    }

    async updateBook(token: string, bookId: string, updateBookDto): Promise<{ success: boolean; data: Books }> {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = this.decodeToken(token, secretKey);
        console.log(updateBookDto, "updated Book")
        const updatedUser = await this.BooksModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });

        const { title, description, category, image } = updatedUser
        return { success: true, data: updatedUser };
    }

    async update(token: string, bookId: string, updateBookDto): Promise<{ success: boolean; data: Books }> {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = this.decodeToken(token, secretKey)
        console.log(user.id, "useriddddd")
        console.log(updateBookDto, "updatebookdto")
        updateBookDto.userid = new ObjectId(user.id);
        console.log(updateBookDto, "updatebookdto1")

        const updatedBook = await this.BooksModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });
        console.log(updatedBook, "updatedbook")

        const { title, description, category, ISBN, availability } = updatedBook
        return { success: true, data: updatedBook };
    }

    async findById(token: string): Promise<{
        success: boolean;
        book?: any;
        message?: string;
    }> {
        try {
            const secretKey = process.env.JWT_SECRET_KEY;
            const user = this.decodeToken(token, secretKey);

            console.log(user, '<<<<<');
            // console.log(user )

            const data = await this.BooksModel.find({ userid: new mongoose.Types.ObjectId(user.id) }).sort({ createdAt: -1 });
            console.log(data, ">>>>>>>>>>>>>>>>>>>>data")
            const [title, description, category, ISBN, availability, status, image] = data;
            //  console.log(data, "data")
            //  console.log(title , "title");
            if (!data) {
                console.log("not exist")
                return {
                    success: false,
                    message: "Book doesn't exist!",
                };
            }

            // console.log(isUser, 'isuser');
            const books = data.map((book) => ({
                _id: book._id,
                title: book.title,
                description: book.description,
                status: book.status,
                availability: book.availability,
                category: book.category,
                ISBN: book.ISBN,
                image: book.image,
                userid: book.userid,
            }));
            // console.log(todos , "todos")
            return {
                success: true,
                book: books,
                message: 'success',

            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'An error occurred while processing the request.',
            };
        }
    }

    async updateReturn(token: string, bookId: string, updateBookDto): Promise<{ success: boolean; data: Books }> {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = this.decodeToken(token, secretKey)
        console.log(user.id, "useriddddd")
        console.log(updateBookDto, "updatebookdto")

        const updatedBook = await this.BooksModel.findByIdAndUpdate(bookId, updateBookDto, { new: true });
        console.log(updatedBook, "updatedbook")

        const { title, description, category, ISBN, availability } = updatedBook
        return { success: true, data: updatedBook };
    }

    async findIssue(token: string): Promise<{ success: boolean; data: Books[] }>{
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = this.decodeToken(token, secretKey)
        const issuedBook = await this.BooksModel.find({availability:'ISSUED'});  
        console.log(issuedBook, "issuebook")
        return { success: true, data: issuedBook };
    }

    async getbookByCategory(category: string): Promise<{ success: boolean; data: Books[] }> {
    
        console.log(category, "category")
        const book = await this.BooksModel.find({category : category});
        console.log(book, "book")
        if (!book) {
            throw new NotFoundException('Book Not Found');
        }
        return { success: true, data: book };
    }

    async delete(token: string, bookId: string , updateBookDto : string): Promise<{ success: boolean; data: Books }> {;

        const deletedBook = await this.BooksModel.findByIdAndUpdate(bookId, {status :"DELETED"}, { new: true });
        console.log(deletedBook, "updatedbook")

        const { title, description, category, ISBN, availability } = deletedBook
        return { success: true, data: deletedBook };
    }



}





