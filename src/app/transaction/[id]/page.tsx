'use client';
import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ITransactionPageParams } from '@/interfaces/transaction.interface';
import { getTransaction } from '@/store/features/transcations.slice';
import './transactionPage.scss';

const TransactionPage: FC<ITransactionPageParams> = ({ params }) => {
	const dispatch = useAppDispatch();
	const { transactionPage } = useAppSelector((store) => store.transaction);
	useEffect(() => {
		dispatch(getTransaction(params.id));
	}, [params]);
	return (
		<>
			{transactionPage ? (
				<>
					<div className={'transactionPage'}>
						<div className="container">
							<div className="transactionPage-wrap">
								<div className={'transactionPage-header'}>
									<h3
										className={
											'transactionPage-header__title'
										}
									>
										Transaction type:{' '}
										{transactionPage.transactionType}
									</h3>
									<p
										className={
											'transactionPage-header__subtitle'
										}
									>
										Datetime:{' '}
										{new Date(
											transactionPage.date
										).toLocaleString()}
									</p>
								</div>
								<div className={'transactionPage-body'}>
									<div
										className={
											'transactionPage-body__details'
										}
									>
										<p>
											Details: {transactionPage.details}
										</p>
									</div>
									<div
										className={
											'transactionPage-body__amount'
										}
									>
										<p>Amount: {transactionPage.amount}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="container">
						<h2>No such element exists</h2>
					</div>
				</>
			)}
		</>
	);
};
export default memo(TransactionPage);
