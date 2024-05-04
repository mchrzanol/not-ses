import { Module } from '@nestjs/common';

import { MailerModule } from './mailer/mailer.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'all-exceptions.filter';

@Module({
  providers:[
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [ 
    MailerModule
  ],
})
export class AppModule {}
