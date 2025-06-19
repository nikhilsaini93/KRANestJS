import { Resolver, Query, Args, Mutation} from "@nestjs/graphql";
import { of } from "rxjs";
import { Post } from "./Schema/post.schema";
import { PostsService } from "./posts.service";
import { UpdatePostInput } from "./args/updatpost.args";
import { PostArgs } from "./args/post.args";




@Resolver(of => Post)
export class PostResolver{

    constructor(private readonly postService: PostsService) {}


    @Query(returns => [Post])
    posts(){
        return this.postService.findAll();
    }


    @Query(returns => Post, { name: 'postByID' })
    getPostById(@Args({ name: 'post_id', type: () => Number }) post_id: number){
        return this.postService.findbyId(post_id);
    }



    @Mutation(returns => String ,  { name: 'postByAuthor' })
createPost(@Args({ name: 'postArgs', type: () => PostArgs }) postArgs: PostArgs) {
    return this.postService.create(postArgs);
}


@Mutation(() => String, { name: 'updatePost' })
async updatePost(
  @Args('updatePostInput') updatePostInput: UpdatePostInput
) {
  return this.postService.update(updatePostInput);
}


    @Mutation(returns => String, { name: 'deletePost' })
    async deletePost(@Args({ name: 'post_id', type: () => Number }) post_id: number){
        return this.postService.delete(post_id);

        
    }


    

}