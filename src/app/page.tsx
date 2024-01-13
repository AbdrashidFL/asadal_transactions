'use client';
import styles from './home.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useEffect, useState } from 'react';
import {
	getSearchingTransaction,
	getTransactions,
} from '@/store/features/transcations.slice';
import { ItemTransaction } from '@/components/ItemTransaction/ItemTransaction';
import { FormFilter } from '@/components/FormFilter/FormFilter';

const Home = () => {
	const dispatch = useAppDispatch();
	const { transactions } = useAppSelector((store) => store.transaction);
	const [stateValueSearch, setStateValueSearch] = useState<string>('');
	useEffect(() => {
		(async () => {
			if (stateValueSearch !== '') {
				await dispatch(getSearchingTransaction(stateValueSearch));
			} else {
				await dispatch(getTransactions());
			}
		})();
	}, [stateValueSearch]);
	return (
		<>
			<div className={styles.transaction}>
				<div className="container">
					<h2 className={styles.title}>Transaction history</h2>
					<input
						className={`input ${styles.input}`}
						type="text"
						placeholder={'Searching'}
						value={stateValueSearch}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setStateValueSearch(e.target.value)
						}
					/>
					<FormFilter />
					<div className={styles.wrap}>
						{transactions.length !== 0 ? (
							<>
								{transactions.map((item, index) => (
									<ItemTransaction data={item} key={index} />
								))}
							</>
						) : (
							<>
								<h2>No transactions</h2>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default Home;
