import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PostComment } from 'src/entities/post-comment.entity';
import { CreatePostCommentInput } from '../models/dtos/create-post-comment.input';
import { PostCommentService } from '../providers/post-comment.service';

@Resolver(() => PostComment)
export class PostCommentResolver {
    constructor(private readonly commentService: PostCommentService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => PostComment)
    createComment(@Args('createCommentInput') createCommentInput: CreatePostCommentInput): Promise<PostComment> {
        return this.commentService.create(createCommentInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [PostComment])
    findCommentsByPost(@Args('postId') postId: string): Promise<PostComment[]> {
        return this.commentService.findByPost(postId);
    }
}
