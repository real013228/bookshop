import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signedIn = false;
  userEmail = '';

  signIn(email: string): void {
    this.signedIn = true;
    this.userEmail = email;
  }

  signOut(): void {
    this.signedIn = false;
    this.userEmail = null;
  }

  getAuthDetails() {
    return {
      signed_in: this.signedIn,
      user_email: this.userEmail,
    };
  }
}
