import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { AuthApiModule } from './auth-api/auth-api.module';
import { UserApiModule } from './user-api/user-api.module';

@Module({
  imports: [BlogsModule , AuthApiModule , UserApiModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
