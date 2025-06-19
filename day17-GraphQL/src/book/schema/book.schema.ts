import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field((type) => Int)
  price: number;

  @Field({ nullable: true })
  description?: string;
}
