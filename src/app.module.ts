import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvFileName } from './helpers/check-env-file';
import { databaseConfig } from './environment/configs/databases';
import { DatabaseModule } from './database/database.module';

const envFileName = getEnvFileName();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: envFileName,
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
