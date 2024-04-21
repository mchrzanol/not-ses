import { Controller } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from './dto/sendEmail.dto';
import { VerificationDto } from './dto/verification.dto';

@Controller()
export class NotSesController {
  constructor(private readonly notSesService: NotSesService) {}

  @EventPattern("email-request")
  handleSendRequest(@Payload() sendInfo:SendEmailDto) {
    return this.notSesService.send(sendInfo);
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
