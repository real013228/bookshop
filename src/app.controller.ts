import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import firebase from 'firebase';
import { AuthController } from './auth/auth.controller';
import {AuthService} from "./auth/auth.service";

@ApiExcludeController()
@Controller()
export class AppController {
  app: firebase.app.App;
  signed_in = false;
  user_email: string;

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {
    this.app = firebase.initializeApp({
      apiKey: process.env.API_KEY,
    });
  }

  @Get()
  @Render('index')
  root() {
    return {
      signed_in: this.authService.signedIn,
      user_email: this.authService.userEmail,
      message: true,
      logged: true,
      accountName: 'Alice',
    };
  }
  @Get('fetch.hbs')
  @Render('partials/fetch.hbs')
  getFetch() {
    return { signed_in: this.signed_in, user_email: this.user_email };
  }

  @Get('results.hbs')
  @Render('partials/results.hbs')
  getResults() {
    return { signed_in: this.signed_in, user_email: this.user_email };
  }

  @Get('webform.hbs')
  @Render('partials/webform.hbs')
  getWebform() {
    return { signed_in: this.signed_in, user_email: this.user_email };
  }
  @Get('authors.hbs')
  @Render('partials/authors.hbs')
  getAuthors() {
    return { signed_in: this.signed_in, user_email: this.user_email };
  }
  @Get('books.hbs')
  @Render('partials/books.hbs')
  getBooks() {
    return { signed_in: this.signed_in, user_email: this.user_email };
  }
  @Get('orders.hbs')
  @Render('partials/orders.hbs')
  getOrders() {
    return { signed_in: this.signed_in, user_email: this.user_email };
  }
  @Get('registerform.hbs')
  @Render('partials/registerform.hbs')
  getRegisterform() {
    return { signed_in: this.authService.signedIn, user_email: this.authService.userEmail };
  }
  @Get('loginform.hbs')
  @Render('partials/loginform.hbs')
  getLoginform() {
    return { signed_in: this.authService.signedIn, user_email: this.authService.userEmail };
  }
}
