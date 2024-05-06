import { Controller, UseGuards } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {SendEmailNotificationDto } from './dto/sendEmailNotification.dto';
import { VerificationDto } from './dto/verification.dto';
import { EmailNotificationGuard } from './guards/email-Notification.guard';
import { EmailVerificationGuard } from './guards/email-verification.guard';

@Controller()
export class NotSesController {
  constructor(private readonly notSesService: NotSesService) {}

  @MessagePattern("email-notification")
  @UseGuards(EmailNotificationGuard)
  async handleEmailNotification(@Payload() sendInfo:SendEmailNotificationDto) {
    return this.notSesService.sendEmailNotification(sendInfo);
  }

  @MessagePattern("verification-code")
  @UseGuards(EmailVerificationGuard)
  async handleVerificationCode(@Payload() verificationInfo:VerificationDto) {
    return this.notSesService.sendVerificationCode(verificationInfo);
  }
}
