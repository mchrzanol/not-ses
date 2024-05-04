import { Module } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { NotSesController } from './not-ses.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from './config.service';
import { ConfigModule } from './config.module';

@Module({
  imports:[
    ConfigModule,
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.getConfig().id);
        return {
          transport: {
            host: configService.getConfig().host,
            port: configService.getConfig().port,
            secure: false,// upgrade later with STARTTLS
            auth: {
              user: configService.getConfig().id,
              pass: configService.getConfig().pass,
            }
          },
          defaults: {
            from: configService.getConfig().id,
          },
          template: {
            dir: process.cwd() + '/templates',
            adapter: new EjsAdapter(),
            options: {
              strict: false,
            },
          },
        };
      },
      inject: [ConfigService], // Inject ConfigService here
    }),
  ],
  controllers: [NotSesController],
  providers: [NotSesService],
})
export class NotSesModule {}
