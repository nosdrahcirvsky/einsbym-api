import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/general.config';
import { graphqlAsyncConfig } from './config/graphql.config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { FileModule } from './modules/file.module';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { AuthModule } from './auth/auth.module';
import { PostCommentModule } from './modules/post-comment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        GraphQLModule.forRootAsync(graphqlAsyncConfig),
        FileModule,
        UserModule,
        AuthModule,
        PostModule,
        PostCommentModule,
    ],
})
export class AppModule {}
