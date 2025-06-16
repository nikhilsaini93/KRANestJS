
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../Decorators/roles.decorators';
import { Role } from 'src/user-accounts/enitity/user-account.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    console.log("roles in guards" , roles)
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    // console.log("request in guards" , request)  
     const user = request.user;
     console.log("user in guards" , user)

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found');
    }
       const hasRole = roles.includes(user.role);
       console.log("hasRole in guards" , hasRole)
        if (!hasRole) {
            throw new ForbiddenException(`Access denied: ${user.role} role is not allowed to access this resource`);
            }
    return hasRole;
  }
}


