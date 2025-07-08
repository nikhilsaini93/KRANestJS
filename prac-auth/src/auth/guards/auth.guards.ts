import {Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



//protected routes
@Injectable()
export class jwtAuthGuards extends AuthGuard("jwt"){

}
