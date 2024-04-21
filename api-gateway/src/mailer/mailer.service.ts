import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailDto } from './dto/sendEmail.dto';
import { VerificationDto } from './dto/verification.dto';

@Injectable()
export class MailerService {
    constructor(@Inject("MAILER_SERVICE") private rabbitClient:ClientProxy){}

    send(sendInfo : SendEmailDto) {
        this.rabbitClient.emit("email-request", sendInfo);

        return {message:"Email send requested."}
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
