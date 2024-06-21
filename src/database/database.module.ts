import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnectionNames } from './connection-names';
import { DatabaseConfigService } from './services/database-config/database-config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfigService,
      imports: [ConfigModule],
      name: ConnectionNames.DefaultConnection,
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
