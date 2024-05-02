import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from "process";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PRIVATE_KEY,
    });
  }

  async validate(payload) {
    console.log(payload);
    return {
      user_id: payload.user_id,
      email: payload.email,
    };
  }
}
