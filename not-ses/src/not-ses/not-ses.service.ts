import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { send } from 'process';
import { VerificationDto } from './dto/verification.dto';
import { SendEmailNotificationDto } from './dto/sendEmailNotification.dto';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from './config.service';
import { FindManyOptions, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotSesService {
    constructor(
      private readonly mailerService: MailerService, 
      private readonly configservice:ConfigService,
      @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {}

    private logger = new Logger(ConfigService.name);

    async sendEmailNotification(sendInfo:SendEmailNotificationDto) {
      const receiversSet = new Set<string>([
        ...(await this.getAllEmailReceiversByGroup(sendInfo.group)),
        ...(sendInfo.to !== undefined ? sendInfo.to : []),
      ]);
      
      const receivers: string[] = Array.from(receiversSet);

      try {
        await this.mailerService.sendMail({
          to:receivers,
          from:this.configservice.getConfig().id,
          subject: sendInfo.title, // Subject line
          html: `<b>${sendInfo.text}</b>`, // HTML body content
        })
        .then((success) => {
          console.log(success)
        })
      }catch(error) {
        this.logger.error("error while sending notification email:", error);
        throw new RpcException(new BadRequestException(error.message));
      }

      return {
        "message":`Notification email has been sended successfully to [${receivers}].`
      }
    };

    async getAllEmailReceiversByGroup(group:string[]):Promise<string[]> {
      if(group.length == 0) {
        return [];
      }
      const options: FindManyOptions<User> = { //filtring criteria
        where: [
          {
            role:In(group)
          }
        ], 
      };

      const receivers:User[] = await this.usersRepository.find(options);

      if(receivers.length == 0) {
        this.logger.log(`No users exists in groups: ${group}.`)
        return [];
      }

      const receiversEmail:string[] = receivers.map(receiver => receiver.email);

      return receiversEmail;
    }    
    
  async sendVerificationCode(verificationInfo:VerificationDto) {
    try {
      await this.mailerService.sendMail({
        to: verificationInfo.to, //receiver
        from: process.env.EMAIL_ID, // sender address
        template:'verification.ejs',
        subject: `Verification Code`,
        context: {
          verificationCode: verificationInfo.code
        }
      })
      .then((success) => {
        console.log(success)
      })
    }catch(error) {
      this.logger.error("error while sending verification email:", error);
      throw new RpcException(new BadRequestException(error.message));
    }
    return {
      "message":`Verification email has been sended successfully ${verificationInfo.to}.`
    }
  }
}
