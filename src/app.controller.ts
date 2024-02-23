import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { 
      message: true,
      logged:true,
      accountName:"Alice",
    };
  }
  @Get('fetch.hbs')
  @Render('partials/fetch.hbs')
  getFetch(){
    return
  }

  @Get('loginform.hbs')
  @Render('partials/loginform.hbs')
  getLoginform(){
    return
  }
  
  @Get('results.hbs')
  @Render('partials/results.hbs')
  getResults(){
    return 
  }
  
  @Get('webform.hbs')
  @Render('partials/webform.hbs')
  getWebform(){
    return
  }
}
