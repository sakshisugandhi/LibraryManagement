import { Controller, ValidationPipe, UploadedFile, UseInterceptors, Res, HttpStatus, Req } from '@nestjs/common';
import { Body, Post, Get, Headers, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-books-dto';
import { Books } from './schemas/books.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post('/post')
    async create(
        @Body() createUserDto: CreateUserDTO,
    ) {
        console.log("heyyaaa")
        console.log(createUserDto)
        return this.booksService.create(createUserDto);
    }

    @Get('/allbooks')
    async findAll(): Promise<any[]> {
        return this.booksService.findAll();
    }

    @Get("/get/:bookId")
    async getbookById(@Headers() headers, @Param('bookId') bookId: string) {
        return this.booksService.getbookById(headers.authorization, bookId);
    }

    @Delete("/delete/:bookId")
    remove(@Headers() headers, @Param("bookId") bookId: string) {
        console.log(bookId, "books ki id")
        return this.booksService.remove(headers.authorization, bookId)
    }

    @Put("/update/:bookId")
    updateBook(@Headers() headers, @Body() updateTodoDto, @Param('bookId') bookId: string) {
        return this.booksService.updateBook(headers.authorization, bookId, updateTodoDto);
    }

    @Put("/put/:bookId")
    update(@Headers() headers, @Body() updateBookDto, @Param('bookId') bookId: string) {
        return this.booksService.update(headers.authorization, bookId, updateBookDto);
    }

    @Get('/vendorbooks')
    async getBookById(@Headers() headers): Promise<{
        success: boolean;
        message?: string;
        book?: Books;
        token?: string;
    }> {

        return this.booksService.findById(headers.authorization);
    }

    @Put("/return/:bookId")
    updateReturn(@Headers() headers, @Body() updateBookDto, @Param('bookId') bookId: string) {
        return this.booksService.updateReturn(headers.authorization, bookId, updateBookDto);
    }


    @Get('/issuedbooks')
    async findOne(@Headers() headers): Promise<{
        success: boolean;
        book?: Books;
    }> {

        return this.booksService.findIssue(headers.authorization);
    }

    @Get("/getBook/:category")
    async getbookByCategory(@Param('category') category: string) {
        console.log(category)
        return this.booksService.getbookByCategory(category);
    }

    @Put("/deleted/:bookId")
    delete(@Headers() headers,  @Body() updateBookDto, @Param('bookId') bookId: string) {
        return this.booksService.delete(headers.authorization, bookId , updateBookDto);
    }
}
