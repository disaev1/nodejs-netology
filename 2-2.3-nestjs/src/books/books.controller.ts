import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { notFoundMessage, deletedMessage } from './books.utils';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    const target = this.booksService.findOne(id);

    if (!target) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: notFoundMessage(id) }, HttpStatus.NOT_FOUND);
    }

    return target;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Book {
    const updated: Book = this.booksService.update(id, updateBookDto);

    if (!updated) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: notFoundMessage(id) }, HttpStatus.NOT_FOUND);
    }

    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    const result: boolean =  this.booksService.remove(id);

    if (!result) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: notFoundMessage(id) }, HttpStatus.NOT_FOUND);
    }

    throw new HttpException({ status:  HttpStatus.OK, message: deletedMessage(id) }, HttpStatus.OK);
  }
}
