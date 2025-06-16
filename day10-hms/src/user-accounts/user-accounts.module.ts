import { Module } from '@nestjs/common';
import { UserAccountsController } from './user-accounts.controller';
import { UserAccountsService } from './user-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccounts } from './enitity/user-account.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccounts]), AuthModule ],
  controllers: [UserAccountsController ],
  providers: [UserAccountsService ]
})
export class UserAccountsModule {}
