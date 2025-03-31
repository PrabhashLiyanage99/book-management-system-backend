import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Book } from './book';  

@ObjectType()
export class PaginatedBooks {
  @Field(() => [Book])
  books: Book[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  noResults: boolean;
}
