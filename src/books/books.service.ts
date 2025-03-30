import { Injectable } from '@nestjs/common';
import { Book } from './book'

@Injectable()
export class BooksService {
    private books: Book[] = [];

    findAll(): Book[] {
        return this.books;
    }

    addBook(bookData: Omit<Book, 'id'>): Book {
        const newBook : Book = { id: this.books.length + 1, ...bookData,
            coverImage: bookData.coverImage || "https://www.google.com/search?sca_esv=2479fda3feeb5a56&sxsrf=AHTn8zqLSC7CSuInOvtPHnuhwpb1O6eNag:1743248400136&q=default+book+image&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBpcx8kZB4NRoUjdgt8WwoMuyQIupIOGmU2uhSATBB80aS2SG5rtp9Y4h-n8Zf-9Gp1Aztai26QjjMy26eQQLkfN7wzSQmuD9vYr2ZSCACLmfOH8yF5bYlaWyzGya38sX1-mr3TKbGk09qK9LalLyLXsr0gbs4VB5wYXqWB9Kq_A_BGeFiw&sa=X&ved=2ahUKEwjt0JStmq-MAxWjR2wGHZImCgwQtKgLegQIERAB&biw=1536&bih=702&dpr=1.25#vhid=eGvNtzTYoD8gOM&vssid=mosaic"         
        };
        this.books.push(newBook);
        return newBook;
    }
}
