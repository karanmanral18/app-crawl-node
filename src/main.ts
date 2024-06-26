import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EventEmitter } from 'events';

(EventEmitter.prototype as any)._maxListeners = 15;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  await app.listen(port);
}
bootstrap();
