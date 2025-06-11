import { Module } from '@nestjs/common';
import { KotGenerationController } from './kot-generation.controller';
import { KotGenerationService } from './kot-generation.service';

@Module({
  controllers: [KotGenerationController],
  providers: [KotGenerationService]
})
export class KotGenerationModule {}
