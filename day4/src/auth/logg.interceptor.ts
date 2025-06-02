
// src/auth/log.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, 
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log(`📥 ${req.method} ${req.url}`);
    return next.handle().pipe(
      tap(() => console.log(`📤 Response sent for ${req.method} ${req.url}`)),
    );
  }
}
