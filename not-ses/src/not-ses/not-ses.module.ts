import { Module } from '@nestjs/common';
import { NotSesService } from './not-ses.service';
import { NotSesController } from './not-ses.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from './config.service';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Email } from './entities/email.entity';

@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      useFactory:()=> ({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Email],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      }),
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => {
        await configService.setConfig();//gets email entity from db
        // console.log(configService.getConfig().id);
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
