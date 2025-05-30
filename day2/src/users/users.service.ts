import { Injectable } from '@nestjs/common';
interface User  {
    id : number;
    username : string;
    password : string;
}

const users  = [
    {
    id : 1,
    username: "Alice",
    password : "12345"
    },
    {
    id : 2,
    username: "Bob",
    password : "12345"
    },
    {
    id : 3,
    username: "Charlie",
    password : "12345"
    }
]

@Injectable()
export class UsersService {
    async finduserbyName(username :string) : Promise<User | undefined> {
        return users.find(user => user.username === username);
    }

}
