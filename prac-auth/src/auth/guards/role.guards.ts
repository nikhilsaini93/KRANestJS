
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../Decorators/roles.decorators';
import { UserRole } from 'src/users/entities/user.entity';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    //("roles in guards" , roles)
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    // //("request in guards" , request)  
     const user = request.user;
    //  //("user in guards" , user)

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found');
    }
       const hasRole = roles.includes(user.role);
       //("hasRole in guards" , hasRole)
        if (!hasRole) {
            throw new ForbiddenException(`Access denied: ${user.role} role is not allowed to access this resource`);
            }
    return hasRole;
  }
}


