import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  authorId?: number;
}