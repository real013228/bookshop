import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { registerDto } from './dto/register.dto';
import firebase from 'firebase';
import {UserService} from "../user/user.service";

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  app: firebase.app.App;
  constructor(private readonly userService: UserService) {}
  signed_in = false;
  user_email: string;
  @Post('/login')
  async login(
    @Body() authCredentialsDto: registerDto,
    @Req() req: Request,
    @Res() res,
  ) {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(
          authCredentialsDto.email,
          authCredentialsDto.password,
        );
      const idToken = await user.user?.getIdToken();
      res.cookie('access_token', idToken, { httpOnly: true });
      return res.redirect('back');
    } catch (e) {
      console.error('Failed to sign in', e);
      throw new HttpException('Failed to sign in', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('/register')
  async register(
    @Body() authCredentialsDto: registerDto,
    @Req() req: Request,
    @Res() res,
  ) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          authCredentialsDto.email,
          authCredentialsDto.password,
        );
      await this.userService.createUser({
        email: authCredentialsDto.email,
        name: 'empty name',
        password: authCredentialsDto.password,
      });
      return res.redirect('back');
    } catch (e) {
      console.error('Failed to register', e);
      throw new HttpException('Failed to register', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res) {
    res.clearCookie('access_token');
    return res.redirect('back');
  }

  @Get('/auth')
  async helloWorld() {
    return 'Hello worlds';
  }
}
