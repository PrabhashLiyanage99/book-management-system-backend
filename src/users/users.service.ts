import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
    private users: User[] = [];

    findAll(): User[] {
        return this.users;
    }

    addUser(name: string, email: string, password: string): User {
        const user = { id: this.users.length + 1, name, email, password };
        this.users.push(user);
        return user;
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
}
