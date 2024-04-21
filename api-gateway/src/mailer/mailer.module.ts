import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'MAILER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'not-ses-queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
