import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

console.log(`[📦 CatsModule Loaded at] ${new Date().toISOString()}`);

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
