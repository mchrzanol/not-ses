import { Module } from '@nestjs/common';

import { MailerModule } from './mailer/mailer.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/http-exception.filter.';
import { RpcExceptionFilter } from './rpc-exception.filter';

@Module({
  providers:[
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter // Providing a single filter class
    },
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter // Providing another filter class
    }
  ],
  imports: [ 
    MailerModule
  ],
})
export class AppModule {}

