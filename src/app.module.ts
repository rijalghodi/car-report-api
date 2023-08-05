import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import cookieSession from 'cookie-session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [User, Report],
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * This is global ValidationPipe
     */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // to make sure that incoming body only contains the expected properiy
      }),
    },
  ],
})
export class AppModule {
  /**
   * This is configuration ofglobal cookie session that
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['randomstring123'] })).forRoutes('*');
  }
}
