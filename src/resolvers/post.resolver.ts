import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from '../providers/post.service';
import { CreatePostInput } from '../models/dtos/create-post.input';
import { UpdatePostInput } from '../models/dtos/update-post.input';
import { Post } from 'src/entities/post.entity';

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Mutation(() => Post)
    createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
        return this.postService.create(createPostInput);
    }

    @Query(() => [Post], { name: 'post' })
    findAll() {
        return this.postService.findAll();
    }

    @Query(() => Post, { name: 'post' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.postService.findOne(id);
    }

    @Mutation(() => Post)
    updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return this.postService.update(updatePostInput.id, updatePostInput);
    }

    @Mutation(() => Post)
    removePost(@Args('id', { type: () => Int }) id: number) {
        return this.postService.remove(id);
    }
}