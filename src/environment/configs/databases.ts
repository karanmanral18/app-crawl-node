
import { ConnectionNames } from '../../database/connection-names';
import {
  DatabaseConfig,
  DatabaseConnectionConfig,
} from './environment-types.interface';

export const databaseConfig = () => {
  const config: DatabaseConfig = {
    databases: {} as any,
  };

  config.databases[ConnectionNames.DefaultConnection] = {
    dialect: process.env.DB_DIALECT,
    name: ConnectionNames.DefaultConnection,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: !!process.env.DB_PORT ? parseFloat(process.env.DB_PORT) : 3306,
    pool: {
      max: !!process.env.DB_POOL_CONNECTION_LIMIT
        ? parseFloat(process.env.DB_POOL_CONNECTION_LIMIT)
        : 2,
      min: 1,
    },
    timezone: !!process.env.DB_TIMEZONE ? process.env.DB_TIMEZONE : '+00:00',
    logging: process.env.DB_DEBUG === 'true',
    benchmark: process.env.DB_DEBUG === 'true',
    models: [__dirname + '/../../database/models/**'],
    migrationDirectory: __dirname + '/../../database/migrations',
  } as DatabaseConnectionConfig;
  return config;
};
