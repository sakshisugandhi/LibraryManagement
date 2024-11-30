import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath : '.env',
    isGlobal : true,
   }),
   MongooseModule.forRoot('mongodb://localhost:27017' ,{dbName: 'librarydb'}), UsersModule , BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
