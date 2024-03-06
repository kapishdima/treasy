import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidSortTypeException extends HttpException {
  constructor() {
    super('Invalid sort type. Expected asc | desc', HttpStatus.BAD_REQUEST);
  }
}
