import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_DB_URL: string = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/test';

@Module({
  imports: [BooksModule, MongooseModule.forRoot(MONGO_DB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
