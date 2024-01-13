import { ITransaction } from '@/interfaces/transaction.interface';

export interface IStateSliceTransaction {
	transactions: ITransaction[];
	transactionPage: ITransaction | null;
}
