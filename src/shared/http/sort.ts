import { Request } from 'express';
import { InvalidSortTypeException } from '../exceptions/http';

export type SortAttrs = Omit<Sort, 'toJson'>;

const SortTypes = ['asc', 'desc'];

export class Sort {
  constructor(readonly request: Request) {}

  get sort() {
    const name = this.request.query.sort as any;
    const type = this.request.query.sortBy as string;

    if (!name || !type) {
      return null;
    }

    if (!SortTypes.includes(type)) {
      throw new InvalidSortTypeException();
    }

    return {
      [name]: this.request.query.sortBy,
    };
  }

  public toJson() {
    return this.sort;
  }
}
