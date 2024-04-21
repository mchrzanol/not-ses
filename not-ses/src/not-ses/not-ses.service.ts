import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotSesService {
    constructor(private readonly mailerService: MailerService) {}

    example() {
        this
          .mailerService
          .sendMail({
            to: 'mchrzanol22@gmail.com', // list of receivers
            from: process.env.EMAIL_ID, // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
          })
          .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });
      }
}
