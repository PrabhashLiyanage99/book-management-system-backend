import { Injectable } from '@nestjs/common';
import { Book } from './book'

@Injectable()
export class BooksService {
    private books: Book[] = [];

    findAll(): Book[] {
        return this.books;
    }

    addBook(bookData: Omit<Book, 'id'>): Book {
        const newBook : Book = { id: this.books.length + 1, ...bookData };
        this.books.push(newBook);
        return newBook;
    }
}
