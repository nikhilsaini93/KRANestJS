import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { User } from './User.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = {username : string , password : string}
type signData = {userId : number , username : string}
type AuthResult = {access_token : string ,userId :number , username : string}
@Injectable()
export class AuthService {
    private users: User[] = [];
constructor(private jwtService: JwtService , private userService : UsersService) {}


register(username: string  , password: string) : User
 {
    const newUser : User ={
        id: this.users.length + 1,
        username,
        password
    };
    this.users.push(newUser);
    return newUser;
 
    }

   validateUser(username: string, password: string): User {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  login(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };

     }

     async authenticate(input : AuthInput) : Promise<AuthResult> {
      const user = await this.validateUsers(input)
      if(!user) throw new UnauthorizedException('Invalid credentials')
      return {
        access_token : "invalid token",
        userId : user.userId,
        username : user.username
      }

     }

  async validateUsers (input :AuthInput) :Promise <signData | null > {
    const user = await this.userService.finduserbyName(input.username)
    if(user &&  user.password === input.password){
      return{
        userId : user.id,
        username : user.username
      }
    }

    return null
  }
}
 

