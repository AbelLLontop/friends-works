import { Injectable } from '@nestjs/common';
import { UserCreate } from './dto/user-create.dto';

export type User = {
    id?:string;
    username:string;
    email:string;
    password:string;
    roles?:string[];
}

@Injectable()
export class UsersService {
    private readonly users:User[] = [
        {
            id: '1',
            username: 'John',
            email: 'john@test.com',
            password:'password',
            roles:['admin']
        },
        {
            id: '2',
            username: 'Doe',
            email: 'doe@test.com',
            password:'password'
        },
        {
            id: '3',
            username: 'Jane',
            email: 'jane@test.com',
            password:'password'
        }
    ]
    

    async findOneByEmail(email:string):Promise<User|undefined>{
        return this.users.find(user=>user.email===email);
    }
    async saveUser(user:UserCreate):Promise<User|undefined>{
        const newUser = {
            ...user,
            id:String(Math.floor(Math.random()*Date.now()))
        }
        this.users.push(newUser);
        return newUser;
    }
    async getAllUsers():Promise<User[]>{
        return this.users;
    }
}
