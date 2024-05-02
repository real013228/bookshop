import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './allexceptions.filter';

async function bootstrap() {
  console.log(process.env.PRIVATE_KEY);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  const hbs = require('hbs');
  // const firebase = require('firebase');
  // const firebaseui = require('firebaseui');
  // const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // ui.start('#firebaseui-auth-container', {
  //   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  //   // Other config options...
  // });
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyA1cCByjixpeU91H8GNwSu_KF0D3TZ7FaA',
  //   authDomain: 'bookshop-fi51.firebaseapp.com',
  //   projectId: 'bookshop-fi51',
  //   storageBucket: 'bookshop-fi51.appspot.com',
  //   messagingSenderId: '162910846585',
  //   appId: '1:162910846585:web:6748e70a05661f1c70dea8',
  // };
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
    .setTitle('Bookshop example')
    .setDescription('The bookshop API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(configService.get('POSTGRES_HOST'));
}

bootstrap();
