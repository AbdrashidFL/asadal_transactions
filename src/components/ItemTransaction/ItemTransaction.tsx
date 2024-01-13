import { FC } from 'react';
import { ITransaction } from '@/interfaces/transaction.interface';
import './itemTransaction.scss';
import Link from 'next/link';

export const ItemTransaction: FC<{ data: ITransaction }> = ({ data }) => {
	return (
		<>
			<Link
				href={`/transaction/${data.id}`}
				className={'transactionItem'}
			>
				<div className={'transactionItem-header'}>
					<h3 className={'transactionItem-header__title'}>
						Transaction type: {data.transactionType}
					</h3>
					<p className={'transactionItem-header__subtitle'}>
						Datetime: {new Date(data.date).toLocaleString()}
					</p>
				</div>
			</Link>
		</>
	);
};
