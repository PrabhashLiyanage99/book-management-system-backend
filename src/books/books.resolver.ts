import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book';
import { GraphQLUpload } from 'graphql-upload-ts';
interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  }
import { createWriteStream } from 'fs';
import { join } from 'path';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    @Query(() => [Book], { name: 'getAllBooks' })
    findAll() {
        return this.booksService.findAll();
    }

    @Mutation(() => Book)
    async addBook(
        @Args('title') title: string,
        @Args('author') author: string,
        @Args('publishedYear') publishedYear: string,
        @Args('genre') genre: string,
        @Args('coverImage', {nullable: true }) coverImage?: string,
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
            coverImage
        });
    }
}