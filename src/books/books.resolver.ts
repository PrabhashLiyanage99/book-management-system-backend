import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book';
import { PaginatedBooks } from './paginated-books';
import { title } from 'process';

// interface FileUpload {
//     filename: string;
//     mimetype: string;
//     encoding: string;
//     createReadStream: () => NodeJS.ReadableStream;
//   }
// import { createWriteStream } from 'fs';
// import { join } from 'path';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    @Query(() => PaginatedBooks, { name: 'getAllBooks' })
    async findAll(
      @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
      @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
      @Args('title', {type: () => String, nullable: true}) title?: string,
      @Args('author',{ type: () => String, nullable: true}) author?: string,
      @Args('genre', { type: () => String, nullable: true }) genre?: string
    ): Promise<PaginatedBooks> {
      const result = await this.booksService.findAll(page, pageSize, title, author, genre);
      return {
        books: result.books,
        totalCount: result.totalCount,
        noResults: result.noResults
      };
    }


    @Mutation(() => Book)
    async addBook(
        @Args('title') title: string,
        @Args('author') author: string,
        @Args('publishedYear') publishedYear: string,
        @Args('genre') genre: string,
        @Args('coverImage', {nullable: true }) coverImage?: string,
        @Args('state', { nullable: true, defaultValue: 'wishlist' }) state?: string
    ) {
        //let coverImagePath: string | undefined;
        
        // if (coverImage) {
        //     const { createReadStream, filename } = await coverImage;
        //     const uniqueFilename = `${Date.now()}-${filename}`;
        //     coverImagePath = `/uploads/${uniqueFilename}`;
            
        //     await new Promise<void>((resolve, reject) => {
        //         createReadStream()
        //             .pipe(createWriteStream(join(process.cwd(), 'public', coverImagePath)))
        //             .on('finish', () => resolve())
        //             .on('error', (error) => reject(error));
        //     });
        // }
    
        return this.booksService.addBook({ 
            title, 
            author, 
            publishedYear, 
            genre, 
            coverImage,
            state
        });
    }

    @Mutation(() => Book)
    async updateBook(
        @Args('id',{ type: () => Int }) id: number,
        @Args('title',{ nullable:true }) title?: string,
        @Args('author', { nullable: true }) author?: string,
        @Args('publishedYear', { nullable: true }) publishedYear?: string,
        @Args('genre',{ nullable: true }) genre?: string,
        @Args('coverImage',{ nullable: true }) coverImage?: string,
        @Args('state', { nullable: true }) state?: string
    ) {
        return this.booksService.updateBook(id,{ title, author, publishedYear, genre, coverImage, state });
    }

    @Mutation(() => Book)
    async deleteBook(@Args('id', {type:() => Int }) id:number) {
        return this.booksService.deleteBook(id);
    }
};