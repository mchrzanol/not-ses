import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmailVerificationGuard implements CanActivate {

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      if (!request) {
        throw new RpcException(`Request is undefined.`);
      }

      const { to, code } = request;

      if (!to) {
        throw new RpcException( new BadRequestException(`Have to be provided "to" argument.`));
      }
      

      if(!code) {
        throw new RpcException(new BadRequestException(`"code" argument is missing`));
      }
      
      return true; //if all arguments are fine 
  }
}