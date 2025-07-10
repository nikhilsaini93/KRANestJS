
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedTypes = this.reflector.get<string[]>(
      'user_types',
      context.getHandler(),
    );
    if (!allowedTypes) return true;

    const request = context.switchToHttp().getRequest();
    console.log('User in Guard:', request.user);

    const user = request.user;

    if (!user || !allowedTypes.includes(user.type)) {
      throw new ForbiddenException('Access denied for your user type');
    }

    return true;
  }
}
