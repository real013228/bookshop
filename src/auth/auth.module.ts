import { Module, DynamicModule } from '@nestjs/common';
import { FirebaseApp } from './firebase-app';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";

@Module({
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [FirebaseApp],
    };
  }
}
