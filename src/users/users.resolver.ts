import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user';
import {  UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User] ,{ name: 'getAllUsers' })
    fimdAll() {
        return this.usersService.findAll();
    }


    @Mutation(() => User)
    async addUser(
        @Args('name') name: string,
        @Args('email') email: string,
        @Args('password') password: string
    ) {
        return this.usersService.addUser(
            name, 
            email, 
            password
        );
    }
}
