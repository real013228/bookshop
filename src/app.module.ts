import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimingInterceptor } from './app.interceptor';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { GenreModule } from './genre/genre.module';
import { AuthorModule } from './author/author.module';
import { FirebaseApp } from './auth/firebase-app';
import { AuthStrategy } from './auth/auth.strategy';
import { PreAuthMiddleware } from './auth/pre-auth.middleware';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    UserModule,
    BookModule,
    OrderModule,
    GenreModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
    FirebaseApp,
    AuthStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '/secure/*',
      method: RequestMethod.ALL,
    });
  }
}
