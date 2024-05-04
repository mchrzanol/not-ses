import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { VerificationDto } from './dto/verification.dto';
import { SendEmailNotificationDto } from './dto/sendEmailNotification.dto';

@Controller('not-ses')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('sendNotification')
  async send(@Body() sendInfo:SendEmailNotificationDto) {
    return this.mailerService.send(sendInfo)
  }
  @Post('verification-code')
  async sendVerificationCode(@Body() verificationInfo:VerificationDto) {
    try {
      const response = await this.mailerService.sendVerificationCode(verificationInfo);
      return response;
  } catch (error) {
      return { Error: error.message };
  }
  }
}
