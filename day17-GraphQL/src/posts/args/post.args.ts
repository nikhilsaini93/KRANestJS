import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class PostArgs {
  @Field()
  title: string;

   @Field()
  content: string;

    @Field({ nullable: true })
  authorId: number;


}