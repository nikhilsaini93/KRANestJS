import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './Entity/post.entity';
import { PostArgs } from './args/post.args';
import { UpdatePostInput } from './args/updatpost.args';


@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}


    async findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findbyId(post_id: number){
        const res = await this.postRepository.findOneBy({ post_id });
        if(!res) {
            throw new NotFoundException('Post not found');
        }
        return res;


    }

    async create(postargs : PostArgs){
        const post = this.postRepository.create(postargs);
        await this.postRepository.save(post);

        return "Post created successfully.";
    }

 async update(updatePostInput: UpdatePostInput) {
    const { id, ...updateData } = updatePostInput;
    await this.postRepository.update(id, updateData);
    return "Post updated successfully.";
}

    async delete(post_id: number){
        const post = await this.findbyId(post_id);
    
        if (!post) {
            throw new Error('Post not found');
        }
        await this.postRepository.remove(post);
        return `post with id ${post_id} deleted successfully.`;
    }






   
}
