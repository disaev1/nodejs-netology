import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = { ...createBookDto, id: uuid() };
    this.books.push(newBook);

    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    const target: Book = this.books.find(book => book.id === id);

    return target || null;
  }

  update(id: string, updateBookDto: UpdateBookDto): Book {
    let updatedBook: Book = null;

    this.books = this.books.map(book => {
      if (book.id === id) {
        updatedBook = { ...updateBookDto, id: book.id };

        return updatedBook;
      }
      return book;
    });

    return updatedBook;
  }

  remove(id: string): boolean {
    const target: Book = this.books.find(book => book.id === id);

    if (!target) {
      return false;
    }

    this.books = this.books.filter(book => book.id !== id);

    return true;
  }
}
