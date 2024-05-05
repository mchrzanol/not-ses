import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigDataDto, ConfigService } from '../config.service';

@Injectable()
export class EmailNotificationGuard implements CanActivate {
  constructor(private configService:ConfigService ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      if (!request) {
        throw new RpcException(`Request is undefined.`);
      }

      const { to, group, sender, title, text } = request;

      if ((!to || !to.length) && !group) {
        throw new RpcException( new BadRequestException(`Have to be provided "to" or "group" argument.`));
      }
      
      if(!sender) {
        throw new RpcException(new BadRequestException(`"Sender" argument is missing.`));
      }

      if(!title || !text) {
        throw new RpcException(new BadRequestException(`"Title" or/and "text" argument is missing`));
      }

      // this.configService.setConfig({        
      //   host: "smtp.office365.co",
      //   port: 587,
      //   id: "not-ses@outlook.com",
      //   pass: "Dupa2137*"
      // })


      return true; //if all arguments are fine 
  }
}