import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument } from './schemas/book.schema';
import { notFoundMessage, deletedMessage } from './books.utils';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<BookDocument> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookDocument[]> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookDocument> {
    const target: BookDocument = await this.booksService.findOne(id);

    if (!target) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: notFoundMessage(id) }, HttpStatus.NOT_FOUND);
    }

    return target;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<BookDocument> {
    const updated: BookDocument = await this.booksService.update(id, updateBookDto);

    if (!updated) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: notFoundMessage(id) }, HttpStatus.NOT_FOUND);
    }

    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result: boolean = await this.booksService.remove(id);

    if (!result) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: notFoundMessage(id) }, HttpStatus.NOT_FOUND);
    }

    throw new HttpException({ status:  HttpStatus.OK, message: deletedMessage(id) }, HttpStatus.OK);
  }
}
