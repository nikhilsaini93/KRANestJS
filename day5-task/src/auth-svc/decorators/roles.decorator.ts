import { SetMetadata } from "@nestjs/common";
import { Role } from "src/user-mng/enitiies/user.entity";



export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);