import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['randomstring@ko910#&10ka0'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to make sure that incoming body only contains the expected properiy
    }),
  );
  await app.listen(1001);
}
bootstrap();
