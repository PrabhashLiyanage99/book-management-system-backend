import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({nullable: true})
  password: string;
}