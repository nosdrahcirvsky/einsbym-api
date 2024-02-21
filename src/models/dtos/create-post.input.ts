import { InputType, Field } from '@nestjs/graphql';
import { CreateImageInput } from './create-image.input';

@InputType()
export class CreatePostInput {
    @Field(() => String)
    userId: string;

    @Field(() => String, { nullable: true })
    postText: string;

    @Field(() => [CreateImageInput], { nullable: true })
    images: CreateImageInput[];
}
