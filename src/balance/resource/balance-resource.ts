import { Resource } from 'src/shared/http';

export class BalanceResource extends Resource {
  public static toObject(balance: any) {
    return {
      id: balance.id,
      amount: balance.amount,
    };
  }

  public static toArray(balances: any[]) {
    return balances.map(this.toObject);
  }
}
