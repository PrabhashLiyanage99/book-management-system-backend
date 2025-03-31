import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
import { validate } from 'graphql';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService

    ) {}
//user signup
    async signup(name: string, email: string, password: string) {
        const existingUser = await this.usersService.findByEmail(email);
        if(existingUser) {
            throw new UnauthorizedException('User email alrady exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.addUser(name, email, hashedPassword);
    }
//user login
    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
//user logout
    async logout() {
        const expiredToken = this.jwtService.sign(
            { sub: 'logout' },
            { secret: process.env.JWT_SECRET, expiresIn: '0s' } 
        );
        return { message: 'Logged out successfully' };
    }
}

