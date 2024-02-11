import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Image } from './image.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ name: 'post_text', type: 'text', nullable: true })
    @Field(() => String)
    postText: string;

    @OneToMany(() => Image, (image) => image.post, { cascade: true })
    images: Image[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}
