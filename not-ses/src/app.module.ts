import { Module } from '@nestjs/common';
import { NotSesModule } from './not-ses/not-ses.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath:'.env.local',
      isGlobal: true,
    }
    ),
    NotSesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
