import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
  getHello(): string {
    return 'Hello World!';
  }
}
