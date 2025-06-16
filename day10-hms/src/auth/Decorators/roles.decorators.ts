import { SetMetadata } from "@nestjs/common";
import { Role } from "src/user-accounts/enitity/user-account.entity";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);