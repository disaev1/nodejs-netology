import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private readonly BookModel: Model<BookDocument>) {}

  public create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const newBook: BookDocument = new this.BookModel({ ...createBookDto, id: uuid() });

    return newBook.save();
  }

  public async findAll(): Promise<BookDocument[]> {
    const books: BookDocument[] = await this.BookModel.find();

    return books;
  }

  async findOne(id: string): Promise<BookDocument> {
    const target: BookDocument = await this.BookModel.findOne({ id });

    return target || null;
  }

  public async update(id: string, updateBookDto: UpdateBookDto): Promise<BookDocument> {
    const updatedBook: BookDocument = await this.BookModel.findOneAndUpdate({ id }, updateBookDto);

    return updatedBook || null;
  }

  public async remove(id: string): Promise<boolean> {
    const target: Book = await this.BookModel.findOneAndRemove({ id });

    if (!target) {
      return false;
    }

    return true;
  }
}
