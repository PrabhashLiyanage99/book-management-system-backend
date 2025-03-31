import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book'

@Injectable()
export class BooksService {
    private books: Book[] = [];

    // findAll(page: number, pageSize: number): { books: Book[], totalCount: number} {
    //     const skip = (page - 1)* pageSize;
    //     const limit = pageSize;

    //     const paginatedBooks = this.books.slice(skip, skip + limit);
    //     const totalCount = this.books.length;
    //     return { books: paginatedBooks, totalCount };
    // }
    findAll(page: number, pageSize: number): { books: Book[], totalCount: number } {
        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        const paginatedBooks = this.books.slice(start, end);
        const totalCount = this.books.length;
    
        return { books: paginatedBooks, totalCount };
      }
    

    addBook(bookData: Omit<Book, 'id'>): Book {
        const newBook : Book = { id: this.books.length + 1, ...bookData,
            coverImage: bookData.coverImage || "https://www.google.com/search?sca_esv=2479fda3feeb5a56&sxsrf=AHTn8zqLSC7CSuInOvtPHnuhwpb1O6eNag:1743248400136&q=default+book+image&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBpcx8kZB4NRoUjdgt8WwoMuyQIupIOGmU2uhSATBB80aS2SG5rtp9Y4h-n8Zf-9Gp1Aztai26QjjMy26eQQLkfN7wzSQmuD9vYr2ZSCACLmfOH8yF5bYlaWyzGya38sX1-mr3TKbGk09qK9LalLyLXsr0gbs4VB5wYXqWB9Kq_A_BGeFiw&sa=X&ved=2ahUKEwjt0JStmq-MAxWjR2wGHZImCgwQtKgLegQIERAB&biw=1536&bih=702&dpr=1.25#vhid=eGvNtzTYoD8gOM&vssid=mosaic"         
        };
        this.books.push(newBook);
        return newBook;
    }

    updateBook(id: number, bookData: Partial<Omit<Book, 'id'>>): Book {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`${id} Book not found`);
        }

        this.books[bookIndex] = {
            ...this.books[bookIndex],
            ...bookData
        };

        return this.books[bookIndex];
    }

    deleteBook(id: number): Book {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`{id} Book not found`);
        }
        const deleteBook = this.books.splice(bookIndex,1)[0];
        return deleteBook;
    }
}
