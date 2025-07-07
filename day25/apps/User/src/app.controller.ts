import { Controller, Inject, OnModuleInit, UseGuards } from '@nestjs/common';

import { UpdateUserDto, UpdateUserRoleDto } from 'types/proto/user';
import { AppService } from './app.service';
import { CreateUserDto, currentUser, Userr, UserServiceControllerMethods ,AuthenticationServiceClient, AUTHENTICATION_SERVICE_NAME} from '@app/common';
import { firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';



@Controller()
@UserServiceControllerMethods()
export class AppController implements OnModuleInit {
  private authService: AuthenticationServiceClient;
  constructor(private readonly usersService: AppService , 
    @Inject(AUTHENTICATION_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

   onModuleInit() {
    this.authService = this.client.getService<AuthenticationServiceClient>(AUTHENTICATION_SERVICE_NAME);
  }

  
  
private async validateAndGetUser(token: string): Promise<Userr> {
  console.log('Validating token:', token);
  const result = await firstValueFrom(this.authService.validateToken({ token }));
  console.log('Validation result:', result);
  if (!result?.isValid) throw new Error('Unauthorized');
  // Build a Userr object with all required fields
  return {
    id: result.userId,
    // email: result.email,
    role: result.role,
    // name: result.name ?? '', // add name if available, or empty string
    password: '', 
  } as Userr;
}


//   async createUser(req: { token: string; data: CreateUserDto }) {
//   console.log('Received request to create user:',req.data);
//   const currentUser = await this.validateAndGetUser(req.token); // validate token and get user info
//   return this.usersService.createUser(req.data, currentUser);
// }


async createUser(createUserDto: CreateUserDto, user: Userr) {
  console.log('Creating user with data:', createUserDto);
  console.log('Current user:', user);
  return this.usersService.createUser(createUserDto, user);

}

  getAllUsers() {
    return this.usersService.getAllUsers();
  }


    
  findUserById(Proid: { id: number }) {
    return this.usersService.findUserById(Proid.id);
  }
  


   async findUserByEmail(data: { email: string }) {
    return this.usersService.findUserByEmail(data);
  }


  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser( updateUserDto);
  }

  deleteUser(DeleteId: { id: number }) {
    return this.usersService.deleteUser(DeleteId.id);
  }

  

  updateUserRole(data: UpdateUserRoleDto) {
    return this.usersService.updateUserRole(data);
  }
}

