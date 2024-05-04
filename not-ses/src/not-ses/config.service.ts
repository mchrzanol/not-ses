import { Injectable } from '@nestjs/common';

export class ConfigDataDto {
  public host: string;
  public port: number;
  public id: string;
  public pass: string;
}

@Injectable()
export class ConfigService {
  private config: ConfigDataDto = {
    host: "smtp.office365.com",
    port: 587,
    id: "not-ses@outlook.com",
    pass: "Dupa2137*"
  };

  setConfig(configData: ConfigDataDto): void {
    this.config = configData;
  }

  getConfig(): ConfigDataDto {
    return this.config;
  }
}
