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
  async sendVerificationCode(@Body() verificationInfo:VerificationDto) {
    try {
      const response = await this.mailerService.sendVerificationCode(verificationInfo);
      return response;
  } catch (error) {
      return { Error: error.message };
  }
  }
}
