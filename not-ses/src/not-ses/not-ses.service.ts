import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/sendEmail.dto';
import { send } from 'process';
import { VerificationDto } from './dto/verification.dto';

@Injectable()
export class NotSesService {
    constructor(private readonly mailerService: MailerService) {}

    send(sendInfo:SendEmailDto) {
        this
          .mailerService
          .sendMail({
            to: sendInfo.to, // list of receivers
            from: process.env.EMAIL_ID, // sender address
            subject: sendInfo.title, // Subject line
            //text: sendInfo.text, // plaintext body
            html: `<b>${sendInfo.text}</b>`, // HTML body content
          })
          .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log("error while sending:", err)
          });
      };
    
  sendVerificationCode(verificationInfo:VerificationDto) {
    this
    .mailerService
    .sendMail({
      to: verificationInfo.to, // list of receivers
      from: process.env.EMAIL_ID, // sender address
      template:'verification.ejs',
      context: {
        serviceName: verificationInfo.serviceName,
        username: verificationInfo.username,
        verificationCode: verificationInfo.code
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log("error while sending:", err)
    });
  }
}
