import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book'

@Injectable()
export class BooksService {
    private books: Book[] = [];

   
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
    
        const totalCount = filteredBooks.length;
        const noResults = totalCount === 0;
        
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        let paginatedBooks = filteredBooks.slice(start, end);
        
        if (paginatedBooks.length === 0 && !noResults) {
            paginatedBooks = filteredBooks;
        }
    
        return { books: paginatedBooks, totalCount, noResults };
    }
    

    addBook(bookData: Omit<Book, 'id'>): Book {
        const newBook : Book = { id: this.books.length + 1, ...bookData,
            state: bookData.state || 'wishlist',
            coverImage: bookData.coverImage || "https://peoplesblog.co.in/sri-vedanta-swarajya-sangam/assets/img/books/default.jpeg"         
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
