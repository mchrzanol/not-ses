import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { send } from 'process';
import { VerificationDto } from './dto/verification.dto';
import { SendEmailNotificationDto } from './dto/sendEmailNotification.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class NotSesService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmailNotification(sendInfo:SendEmailNotificationDto) {
      const to = sendInfo.to;
      const from = sendInfo.sender;//email

      await this.mailerService.sendMail({
        to:sendInfo.to,
        from:process.env.EMAIL_ID,//TODO:to do zmiany
        subject: sendInfo.title, // Subject line
        html: `<b>${sendInfo.text}</b>`, // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch(async (err) => {
        console.log("error while sending:", err)
        throw new RpcException(err)
      });
      return {
        "message":"Email has been sended successfully"
      }
      };

      
    
  sendVerificationCode(verificationInfo:VerificationDto) {
    this
    .mailerService
    .sendMail({
      to: verificationInfo.to, //receiver
      from: process.env.EMAIL_ID, // sender address
      template:'verification.ejs',
      subject: `${verificationInfo.serviceName} Verification Code`,
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
