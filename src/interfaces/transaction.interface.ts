export interface ITransaction {
	date: string;
	amount: string;
	transactionType: 'payment';
	details: 'invoice transaction at Ernser Inc using card ending with ***(...6532) for BMD 150.43 in account ***14745565';
	id: '1';
}
export interface ITransactionPageParams {
	params: { id: string };
}