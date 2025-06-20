import { Observable } from "rxjs";

// user-grpc.interface.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  id: number;
  name: string;
  email: string;
}

export interface Id {
  id: number;
}

export interface Empty {}

export interface UserServiceGrpc {
  CreateUser(data: CreateUserDto): Observable<User>;
  GetUser(data: Id): Observable<User>;
  GetAllUsers(data: Empty): Observable<{ users: User[] }>;
  UpdateUser(data: UpdateUserDto): Observable<User>;
  DeleteUser(data: Id): Observable<Empty>;
}
