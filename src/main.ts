import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * This app.use(cookieSession).. is commented because cookie-session
   * has been moved to app.module, so that both dev and test mode can use
   * cookie-session (this main.ts not executed in testing mode)
   */
  // app.use(
  //   cookieSession({
  //     keys: ['randomstring@ko910#&10ka0'],
  //   }),
  // );

  /**
   * This app.useGlobalPipe is commented because validation pipe
   * has been moved to app.module so that both development and testing
   * mode can use the validation pipa (main.ts not executed in testing mode)
   */
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // to make sure that incoming body only contains the expected properiy
  //   }),
  // );
  await app.listen(1001);
}
bootstrap();
