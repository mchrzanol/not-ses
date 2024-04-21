require('dotenv').config()
import { Module } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { NotSesController } from './not-ses.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports:[
    MailerModule.forRootAsync({
      useFactory: () => ({
      transport: {
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:false,
        auth: {
          user:process.env.EMAIL_ID,
          pass:process.env.EMAIL_PASS
        }
      },
      defaults: {
        from: process.env.EMAIL_ID,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  }),
  ],
  controllers: [NotSesController],
  providers: [NotSesService],
})
export class NotSesModule {}
