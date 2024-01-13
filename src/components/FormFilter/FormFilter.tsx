'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ETransactions } from '@/enums/transaction.enum';
import { useAppDispatch } from '@/store/store';
import { getFilterTransaction } from '@/store/features/transcations.slice';
import { IModalFilterState } from '@/interfaces/ui.interface';
import './formFilter.scss';

export const FormFilter = () => {
	const dispatch = useAppDispatch();
	const [stateFilter, setStateFilter] = useState<IModalFilterState>({
		date: '',
		amount: '',
		transactionType: '',
	});
	const optionsDate = [
		{ label: 'New date', value: ' ' },
		{ label: 'Old date', value: 'sortBy=date' },
	];
	const optionsAmount = [
		{ label: 'Max value', value: '' },
		{ label: 'Min value', value: 'sortBy=amount' },
	];
	const optionsTransactionType = [
		{ label: 'Payment', value: `transactionType=${ETransactions.payment}` },
		{ label: 'Deposit', value: `transactionType=${ETransactions.deposit}` },
		{ label: 'Invoice', value: `transactionType=${ETransactions.invoice}` },
		{
			label: 'Withdrawal',
			value: `transactionType=${ETransactions.withdrawal}`,
		},
	];

	const handleValue = (e: ChangeEvent<HTMLSelectElement>) => {
		setStateFilter({
			...stateFilter,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		let queryParameters: string = '';

		const valuesWithoutNulls: Record<string, string> = Object.entries(
			stateFilter
		)
			.filter(([_, value]) => value !== '')
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
		for (const filter in valuesWithoutNulls) {
			queryParameters += `${valuesWithoutNulls[filter]}&`;
		}
		await dispatch(getFilterTransaction(queryParameters));
	};

	return (
		<>
			<div className="formFilter">
				<h3 className="formFilter-title">Filters</h3>
				<form className="formFilter-form" onSubmit={onSubmit}>
					<select
						name="date"
						onChange={handleValue}
						defaultValue={optionsDate[0].value}
					>
						{optionsDate.map((item, index) => (
							<option value={item.value} key={index}>
								{item.label}
							</option>
						))}
					</select>
					<select
						name="amount"
						onChange={handleValue}
						defaultValue={optionsAmount[0].value}
					>
						{optionsAmount.map((item, index) => (
							<option value={item.value} key={index}>
								{item.label}
							</option>
						))}
					</select>
					<select
						name="transactionType"
						onChange={handleValue}
						defaultValue={optionsTransactionType[0].value}
					>
						{optionsTransactionType.map((item, index) => (
							<option value={item.value} key={index}>
								{item.label}
							</option>
						))}
					</select>
					<button className={'button'}>Apply</button>
				</form>
			</div>
		</>
	);
};
