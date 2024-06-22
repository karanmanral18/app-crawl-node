import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvFileName } from './helpers/check-env-file';
import { databaseConfig } from './environment/configs/databases';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { ModelBootstrapModule } from './database/model-bootstrap/model-bootstrap.module';
import { PaginateOverwriteModule } from './paginate-overwrite/paginate-overwrite.module';

const envFileName = getEnvFileName();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: envFileName,
      isGlobal: true,
    }),
    DatabaseModule,
    ClientModule,
    ModelBootstrapModule,
    PaginateOverwriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
