import { Resource } from 'src/shared/http';

export class OperationResource extends Resource {
  public static toObject(operation: any) {
    return {
      id: operation.id,
      category: {
        id: operation.category.id,
        name: operation.category.name,
      },
      balance: operation.balance,
      amount: operation.amount,
    };
  }

  public static toArray(operations: any[]) {
    return operations.map(this.toObject);
  }
}
