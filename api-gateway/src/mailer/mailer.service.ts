import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailDto } from './dto/sendEmail.dto';

@Injectable()
export class MailerService {
    constructor(@Inject("MAILER_SERVICE") private rabbitClient:ClientProxy){}

    send(sendInfo : SendEmailDto) {
        this.rabbitClient.emit("email-request", sendInfo);

        return {message:"Email send requested"}
    }
}
