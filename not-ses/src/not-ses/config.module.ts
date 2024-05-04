import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // Make ConfigService available for injection in other modules
})
export class ConfigModule {}
