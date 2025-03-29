import { Resolver,Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book';
import { title } from 'process';
import { generate } from 'rxjs';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    @Query(() => [Book], { name: 'getAllBooks' })
    findAll() {
        return this.booksService.findAll();
    }

    @Mutation(() => Book)
    addBook(
        @Args('title') title: string,
        @Args('author') author: string,
        @Args('publishedYear') publishedYear: string,
        @Args('genre') genre: string,
    ) {
        return this.booksService.addBook({ title, author, publishedYear, genre });
    }
}
