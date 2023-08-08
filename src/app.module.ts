import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
var cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    /**
     * This is the nestjs recommendation way to config database
     * Ini dilakukan supaya bisa membedakan db untuk testing dan development
     * Caranya dengan menggunakan ConfigModule dan ConfigService, fitur NestJS
     * untuk menyediakan env
     */
    ConfigModule.forRoot({
      isGlobal: true, // to used globally (?)
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get('DB_NAME'),
          // synchronize: true,
          // If synchronize: true typeorm will create database automatically based of entities
          entities: ['dist/**/*.entity.js'],
          /**
           * Also you can import entities here...
           */
          // entities: [User, Report],
        };
      },
    }),

    /**
     * This is simple way to config database
     */
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   synchronize: true,
    //   entities: [User, Report],
    // }),
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
  // ConfigService injection supaya bisa menggunakan env variables sesuai mode (test, dev, prod)
  constructor(private configService: ConfigService) {}

  /**
   * This is configuration of global cookie session
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [
            this.configService.get('COOKIE_KEY'), // Gunakan env variable untuk COOKIE_KEY
          ],
        }),
      )
      .forRoutes('*');
  }
}
