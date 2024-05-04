import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VerificationDto } from './dto/verification.dto';
import { SendEmailNotificationDto } from './dto/sendEmailNotification.dto';

@Injectable()
export class MailerService {
    constructor(@Inject("MAILER_SERVICE") private rabbitClient:ClientProxy){}

    async send(sendInfo : SendEmailNotificationDto) {
        return new Promise((resolve, reject) => {
            this.rabbitClient.send("email-notification", sendInfo).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    async sendVerificationCode(verificationInfo:VerificationDto): Promise<any>  {
        return new Promise((resolve, reject) => {
            this.rabbitClient.send("verification-code", verificationInfo).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }
}
