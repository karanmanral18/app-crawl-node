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
import { ElasticSearchModule } from './elastic-search/elastic-search.module';
import { CommonModule } from './common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CliCommandsModule } from './cli-commands/cli-commands.module';

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
    ElasticSearchModule,
    CommonModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      maxListeners: 50000,
      verboseMemoryLeak: true,
    }),
    CliCommandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
