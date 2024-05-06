import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [ConfigService],
  exports: [ConfigService], // Make ConfigService available for injection in other modules
})
export class ConfigModule {}
