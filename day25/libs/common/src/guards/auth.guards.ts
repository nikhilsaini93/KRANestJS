// // @app/common/guards/jwt.guard.ts
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { RpcException } from '@nestjs/microservices';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService, private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const ctx = context.switchToRpc();
//     const data = ctx.getData();

//     const token = data?.token;
//     if (!token) throw new RpcException(new UnauthorizedException('Token missing'));

//     try {
//       const payload = this.jwtService.verify(token.replace('Bearer ', ''), {
//         secret: 'mySecretKey',
//       });

//       // Attach user info to request
//       data.user = payload;

//       return true;
//     } catch (e) {
//       throw new RpcException(new UnauthorizedException('Invalid token'));
//     }
//   }
// }


import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



//protected routes
@Injectable()
export class jwtAuthGuards extends AuthGuard("jwt"){

}
