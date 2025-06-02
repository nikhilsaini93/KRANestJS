import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/user/user.entity";
import { UserRole } from "../entities/user.entity";
import { ROLES_Key } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {

    //reflector is used to access metadata set by decorators
    constructor(private reflector: Reflector) {}


    // like same as middleware(next function)
    canActivate(context: ExecutionContext): boolean  {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_Key , 
            [context.getHandler(), context.getClass()]
        )
        
        if(!requiredRoles) {
            return true; // If no roles are required, allow access
        }

        const {user} = context.switchToHttp().getRequest();
        if (!user || !user.role) {
             throw new ForbiddenException("Access denied: User role not authenticated");
        }
        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole) {
            throw new ForbiddenException("Access denied: Insufficient permissions");
            }
        return true;  
        
    }

    
}
    
