import { Request } from 'express';
import { Filters } from 'src/shared/http';

export type OperationFiltersParams = Omit<OperationFilters, 'toJson'>;

export class OperationFilters extends Filters {
  constructor(readonly request: Request) {
    super(request);
  }

  get balanceId(): any {
    return this.request.query.balance as string;
  }

  get categoryId() {
    return this.request.query.category;
  }

  get type() {
    return this.request.query.type;
  }
}
