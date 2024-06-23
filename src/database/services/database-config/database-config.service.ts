import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { ConnectionNames } from '../../../database/connection-names';
import { DefaultConnectionModels } from '../../../database/model-bootstrap/default-connection-models';

@Injectable()
export class DatabaseConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(
    connectionName?: string,
  ): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
    connectionName = connectionName || ConnectionNames.DefaultConnection;
    const config = this.configService.get<SequelizeModuleOptions>(
      `databases.${connectionName}`,
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // config.sync = true;
    // config.synchronize = true;
    config.autoLoadModels = true;
    config.models = DefaultConnectionModels;

    return config;
  }
}
