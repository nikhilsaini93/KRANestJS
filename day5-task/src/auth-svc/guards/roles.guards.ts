import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user-mng/enitiies/user.entity';



@Injectable()
export class RolesGuard implements CanActivate {

  
    constructor(private reflector: Reflector) {}


  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    
     const hasRole = roles.includes(user.role);
        if (!hasRole) {
            throw new ForbiddenException("Access denied: Insufficient permissions");
            }
    return hasRole;
  }
}