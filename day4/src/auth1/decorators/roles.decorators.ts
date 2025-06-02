import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../entities/user.entity";


// unique identifier for storing and retrieving roles metadata
export const ROLES_Key = 'roles';


// Decorator to assign roles to routes or handlers 
// certain rolls

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_Key, roles);