import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('HAVEN-BOOTSTRAP');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Haven Backend v1.2-CLOUD running on port ${port} 🚀`);
  logger.log('Connected to Serverless Redis Cluster (Upstash)');
}
bootstrap();
