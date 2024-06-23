import { NestFactory } from '@nestjs/core';
import { CommandService } from 'nestjs-command';
import { AppModule } from './app.module';
import * as process from 'process';

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  await app.get(CommandService).exec();
  await app.close();
  process.exit(0);
})();
