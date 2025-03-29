import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  publishedYear: string;

  @Field()
  genre: string;
}