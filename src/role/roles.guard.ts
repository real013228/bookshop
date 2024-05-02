import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.cookie.split('=')[1];

    if (!token) return false;

    try {
      const decodedToken = await admin.auth().verifyIdToken(token); // Verifies the token and retrieves the UID
      const uid = decodedToken.uid;

      const doc = await admin.firestore().collection('users').doc(uid).get();
      if (!doc.exists) {
        return false;
      }

      const user = doc.data();
      const roles: string[] = user.role;

      return roles.some((role) => this.allowedRoles.includes(role));
    } catch (error) {
      return false;
    }
  }
}
