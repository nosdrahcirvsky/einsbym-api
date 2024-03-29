import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from '../../resolvers/post.resolver';
import { PostService } from '../../providers/post.service';

describe('PostResolver', () => {
    let resolver: PostResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostResolver, PostService],
        }).compile();

        resolver = module.get<PostResolver>(PostResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
