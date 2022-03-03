interface Book {
  id: string;
  title?: string;
  description?: string;
  authors?: string[];
  favourite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}

// BooksApi mock
class BooksApi {
  static createBook(book: Book): Book {
    return book;
  }

  static get(id: string): Book {
    return { id, title: 'Book mock' };
  }

  static getAll(): Book[] {
    return [{ id: '1', title: 'Book mock' }];
  }

  static update(book: Book): Book {
    return book;
  }
}

class BooksRepository {
  createBook(book: Book): Book {
    const newBook = BooksApi.createBook(book);

    return newBook;
  }

  getBook(id: string): Book {
    const targetBook = BooksApi.get(id);

    return targetBook;
  }

  getBooks(): Book[] {
    const books = BooksApi.getAll();

    return books;
  }

  updateBook(book: Book): Book {
    const targetBook = BooksApi.update(book);

    return targetBook;
  }
}
