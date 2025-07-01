
// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role, ROLES_KEY } from '../decorators/roles.decorators';


// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
//     console.log("roles in guards" , roles)
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
    
//     // console.log("request in guards" , request)  
//      const user = request.user;
//      console.log("user in guards" , user)

//     if (!user || !user.role) {
//       throw new ForbiddenException('User role not found');
//     }
//        const hasRole = roles.includes(user.role);
//        console.log("hasRole in guards" , hasRole)
//         if (!hasRole) {
//             throw new ForbiddenException(`Access denied: ${user.role} role is not allowed to access this resource`);
//             }
//     return hasRole;
//   }
// }




// @app/common/guards/role.guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Role } from '../decorators';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const ctx = context.switchToRpc();
    const data = ctx.getData();
    const user = data.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new RpcException(new ForbiddenException('Forbidden: Invalid Role'));
    }

    return true;
  }
}




