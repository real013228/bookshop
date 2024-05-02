import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import firebase from 'firebase';

@ApiExcludeController()
@Controller()
export class AppController {
  app: firebase.app.App;
  signed_in = false;
  user_email: string;

  constructor(private readonly appService: AppService) {
    this.app = firebase.initializeApp({
      apiKey: process.env.API_KEY,
    });
  }

  @Get()
  @Render('index')
  root() {
    return {
      signed_in: this.signed_in,
      user_email: this.user_email,
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

  @Get('loginform.hbs')
  @Render('partials/loginform.hbs')
  getLoginform() {
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
}
