import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { User , CreateUserDto , UpdateUserDto, PaginationDto, UserList } from 'libs/common/src/types/auth';
import { Observable, Subject } from 'rxjs';
 
@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users : User[] = []
  private id = 1

  onModuleInit() {


    
  }
 create(createUserDto: CreateUserDto) {
  console.log('Received DTO:', createUserDto); // Add this line
  const user = { ...createUserDto, id: this.id++, socialMedia: createUserDto.socialMedia ?? {} };
  this.users.push(user);
  return user;
}
   
  findAll() {
    return { users: this.users };
  }

  findOne(id: number) {    
    const res =  this.users.find(user => user.id === id);
    if(!res ){
      throw new NotFoundException(`User with ID ${id} not found`);

    }
    return res;
  }

  update(id: number, data: UpdateUserDto) {
   const index = this.users.findIndex(u => u.id === data.id);
    if (index >= 0) {
      this.users[index] = {
        ...this.users[index],
        ...data,
      }; 
          return this.users[index];
    }
    throw new NotFoundException(`User with ID ${id} not found`);

  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index >= 0) {
     return  this.users.splice(index, 1)[0];
     }
     throw new NotFoundException(`User with ID ${id} not found`);
  }

queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<User> {
    const subject = new Subject<User>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      const usersChunk = this.users.slice(start, start + paginationDto.skip);
      usersChunk.forEach(user => subject.next(user));
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

}  
