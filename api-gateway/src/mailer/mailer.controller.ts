import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { VerificationDto } from './dto/verification.dto';

@Controller('not-ses')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  send(@Body() sendInfo:SendEmailDto) {
    return this.mailerService.send(sendInfo)
  }
  @Post('verification-code')
  sendVerificationCode(@Body() verificationInfo:VerificationDto) {
    return this.mailerService.sendVerificationCode(verificationInfo);
  }
}
