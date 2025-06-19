import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
@Field((type) => Number)
  post_id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  authorId: number;
}
