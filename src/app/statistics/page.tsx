'use client';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getTransactions } from '@/store/features/transcations.slice';
import { IDiagramsDataState } from '@/interfaces/statistics.interface';
import { ETransactions } from '@/enums/transaction.enum';
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import './statistics.scss';

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
const Statistics: NextPage = () => {
	const dispatch = useAppDispatch();
	const { transactions } = useAppSelector((store) => store.transaction);
	const [stateDiagrams, setStateDiagrams] = useState<IDiagramsDataState>({
		doughnut: {
			labels: [],
			datasets: [],
		},
		barChart: {
			labels: [],
			datasets: [],
		},
	});
	const getRandomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min) + min);
	};
	const generateDataDoughnut = () => {
		const labels = Object.values(ETransactions);
		const dataLabels: { [key: string]: number } = {};
		Object.keys(ETransactions).forEach((key) => {
			dataLabels[key] = 0;
		});
		transactions.forEach((item) => {
			dataLabels[`${item.transactionType}`] += 1;
		});
		const bgColor = labels.map(
			() =>
				`rgba(${getRandomNumber(0, 255)}, ${getRandomNumber(
					0,
					255
				)}, ${getRandomNumber(0, 255)}, 1)`
		);
		setStateDiagrams((prevState) => ({
			...prevState,
			doughnut: {
				labels,
				datasets: [
					{
						label: 'count',
						data: Object.values(dataLabels),
						backgroundColor: bgColor,
						borderColor: bgColor,
						borderWidth: 1,
					},
				],
			},
		}));
	};
	const generateDataBarChart = () => {
		const labels = ['Statistics type amount'];
		const dataLabels: { [key: string]: number } = {};
		Object.keys(ETransactions).forEach((key) => {
			dataLabels[key] = 0;
		});
		transactions.forEach((item) => {
			dataLabels[`${item.transactionType}`] += parseInt(item.amount);
		});
		let datasets: {
			label: string;
			data: number[];
			backgroundColor: string;
		}[] = [];
		for (let key in dataLabels) {
			datasets.push({
				label: key,
				data: [dataLabels[`${key}`]],
				backgroundColor: `rgba(${getRandomNumber(
					0,
					255
				)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, 1)`,
			});
		}
		setStateDiagrams((prevState) => ({
			...prevState,
			barChart: {
				labels,
				datasets,
			},
		}));
	};
	useEffect(() => {
		(async () => {
			await dispatch(getTransactions());
		})();
	}, []);
	useEffect(() => {
		generateDataDoughnut();
		generateDataBarChart();
	}, [transactions]);

	return (
		<>
			{stateDiagrams && stateDiagrams.doughnut ? (
				<>
					<div className="statistics">
						<div className="container">
							<div className="statistics-diagram">
								<h2 className="statistics-diagram__title">
									Diagram
								</h2>
								<p className="statistics-diagram__text">
									Diagram showing the total number of
									transactions by type transaction
								</p>
								<div className="statistics-diagram__wrap">
									<Doughnut data={stateDiagrams.doughnut} />
								</div>
							</div>
							<div className="statistics-diagram">
								<h2 className="statistics-diagram__title">
									Bar chart
								</h2>
								<p className="statistics-diagram__text">
									Bar chart shows number of transaction types
								</p>
								<div className="statistics-diagram__wrap">
									<Bar
										options={{
											responsive: true,
											plugins: {
												legend: {
													position: 'top' as const,
												},
											},
										}}
										data={stateDiagrams.barChart}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="container">
						<h2>No data for statistics</h2>
					</div>
				</>
			)}
		</>
	);
};

export default Statistics;
