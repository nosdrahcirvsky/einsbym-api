import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '30m' },
                global: true,
            }),
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, UserService, AuthResolver, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}