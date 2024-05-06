import { Injectable, Logger } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { InjectRepository } from '@nestjs/typeorm';

class ConfigDataDto {
  public host: string;
  public port: number;
  public id: string;
  public pass: string;
}

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Email) private readonly emailRepository: Repository<Email>,
  ) {}
  private config: ConfigDataDto;

  private logger = new Logger(ConfigService.name);

  async setConfig(): Promise<void> {
    const emailID = process.env.EMAIL_ID;
    if(emailID === undefined) {
      this.logger.error('Email ID is not defined. Turning off service.');
      process.exit(1);
    }

    const options:FindOneOptions<Email> = {
      where:{email:emailID}//searching by email id e.g. twojastara@gmail.com
    }

    const emailEntity: Email = await this.emailRepository.findOne(options);

    if(!emailEntity) {
      this.logger.error(`Email entity with id ${emailID} is not defined in database.`);
      process.exit(1);
    }else {
      this.logger.log('Email entity find successfully.')
    }

    this.config = {
      host:emailEntity.host,
      port:emailEntity.port,
      id:emailEntity.email,
      pass:emailEntity.pass
    }

  }

  getConfig(): ConfigDataDto {
    return this.config;
  }
}
