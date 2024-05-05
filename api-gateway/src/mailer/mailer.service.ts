import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { VerificationDto } from './dto/verification.dto';
import { SendEmailNotificationDto } from './dto/sendEmailNotification.dto';
import { throwError } from 'rxjs';

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
                    console.log(error.response);
                    const rpcException = new RpcException(error.response);
                    reject(rpcException);
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
