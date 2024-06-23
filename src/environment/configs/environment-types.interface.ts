import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConnectionNames } from '../../database/connection-names';

export interface DatabaseConnectionConfig extends SequelizeModuleOptions {
  migrationDirectory: string;
}

export interface DatabaseConfig {
  databases: Record<ConnectionNames, DatabaseConnectionConfig>;
}
