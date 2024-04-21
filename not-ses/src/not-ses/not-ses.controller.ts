import { Controller } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from './dto/sendEmail.dto';
import { VerificationDto } from './dto/verification.dto';

@Controller()
export class NotSesController {
  constructor(private readonly notSesService: NotSesService) {}

  @EventPattern("email-request")
  handleSendRequest(@Payload() sendInfo:SendEmailDto) {
    return this.notSesService.send(sendInfo);
  }

  @EventPattern("verification-code")
  handleVerificationCode(@Payload() verificationInfo:VerificationDto) {
    return this.notSesService.sendVerificationCode(verificationInfo);
  }
}
