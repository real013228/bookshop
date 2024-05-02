import { Module, DynamicModule } from '@nestjs/common';
import { FirebaseApp } from './firebase-app';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [FirebaseApp],
    };
  }
}
