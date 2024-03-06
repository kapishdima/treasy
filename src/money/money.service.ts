import { Injectable } from '@nestjs/common';

@Injectable()
export class MoneyService {
  add(from: number, to: number) {
    return from + to;
  }

  sub(from: number, to: number) {
    return from - to;
  }
}
