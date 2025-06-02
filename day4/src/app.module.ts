// import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { AuthMiddleware } from './auth/auth.middlware';

// @Module({
//   imports: [UserModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {
//   configure(consumer : MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('*');
//   }
// }


//use db 

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/auth.middlware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth1Module } from './auth1/auth1.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : "postgres",
      host: "localhost",
      port : 5432,
      username: "postgres",
      password: "admin",
      database: "testdb",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    Auth1Module,
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}




