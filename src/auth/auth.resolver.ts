import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

    //user signup
    @Mutation(() => String)
        async signup(
            @Args('name') name: string,
            @Args('email') email: string,
            @Args('password') password: string
        ) {
            await this.authService.signup(name, email, password);
            return 'User registerd successfully';
        }

        //user login
        @Mutation(() => String)
        async login(
            @Args('email') email: string,
            @Args('password') password: string
        ) {
            const { access_token} = await this.authService.login(email, password);
            return access_token;
        }

        //check user is authenticated
        @Query(() => Boolean)
        async validateToken(@Context() ctx): Promise<boolean> {
            const authHeader = ctx.req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException('Token is required');
            }

            const token = authHeader.split(" ")[1];
            try {
                this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
                return true;
            } catch (error) {
                throw new UnauthorizedException('Invalid token');
            }
        }

    }

