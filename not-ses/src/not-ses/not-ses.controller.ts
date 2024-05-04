import { Controller, UseGuards } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {SendEmailNotificationDto } from './dto/sendEmailNotification.dto';
import { VerificationDto } from './dto/verification.dto';
import { EmailNotificationGuard } from './guards/email-Notification.guard';

@Controller()
export class NotSesController {
  constructor(private readonly notSesService: NotSesService) {}

  @MessagePattern("email-notification")
  @UseGuards(EmailNotificationGuard)
  async handleEmailNotification(@Payload() sendInfo:SendEmailNotificationDto) {
    return this.notSesService.sendEmailNotification(sendInfo);
  }

  @MessagePattern("verification-code")
  handleVerificationCode(@Payload() verificationInfo:VerificationDto) {
    if (!verificationInfo.code || !verificationInfo.to || !verificationInfo.serviceName || !verificationInfo.username) {
      return { 
        "statusCode": 400,
        "Error": "Some missing arguments in the message body."
       };
  }

  try {
      this.notSesService.sendVerificationCode(verificationInfo);
      return {message: `Verification code ${verificationInfo.code} has been sended to ${verificationInfo.to}.`};
  } catch (error) {
      console.error("Error sending verification code:", error);
      return {
         "statusCode": 400,
         "Error": "Failed to send verification code." 
        };
  }
  }
}
