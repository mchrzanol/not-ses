import { Controller } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailDto } from './dto/sendEmail.dto';

@Controller()
export class NotSesController {
  constructor(private readonly notSesService: NotSesService) {}

  @EventPattern("email-request")
  handleSendRequest(@Payload() sendInfo:SendEmailDto) {
    console.log(sendInfo.to);
    return this.notSesService.example();
  }
}
