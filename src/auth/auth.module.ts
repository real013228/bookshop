import { Module, DynamicModule } from '@nestjs/common';
import { FirebaseApp } from './firebase-app';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [FirebaseApp],
    };
  }
}
