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

    sendVerificationCode(verificationInfo:VerificationDto) {
        this.rabbitClient.emit("verification-code", verificationInfo);

        return {message: `Verification code ${verificationInfo.code} has been sended to ${verificationInfo.to}.`}
    }
}
