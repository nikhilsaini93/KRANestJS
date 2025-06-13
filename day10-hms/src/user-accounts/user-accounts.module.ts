import { Module } from '@nestjs/common';
import { UserAccountsController } from './user-accounts.controller';
import { UserAccountsService } from './user-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccounts } from './enitity/user-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccounts])],
  controllers: [UserAccountsController],
  providers: [UserAccountsService]
})
export class UserAccountsModule {}
