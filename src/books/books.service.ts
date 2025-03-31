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
    findAll(page: number, pageSize: number, title?: string, author?: string, genre?: string): { books: Book[], totalCount: number, noResults: boolean } {
        let filteredBooks = this.books;

        if (title) {
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
        }

        if (author) {
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
        }

        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
        }
        const noResults = filteredBooks.length === 0;

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        const paginatedBooks = this.books.slice(start, end);
        const totalCount = this.books.length;
    
        return { books: paginatedBooks, totalCount, noResults };
      }
    

    addBook(bookData: Omit<Book, 'id'>): Book {
        const newBook : Book = { id: this.books.length + 1, ...bookData,
            state: bookData.state || 'wishlist',
            coverImage: bookData.coverImage || "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781408855713.jpg"         
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
