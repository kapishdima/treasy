import { OperationTypes } from '@prisma/client';

export type CalculateBalanceDto = {
  balanceId: string;
  amount: number;
  type: OperationTypes;
};
