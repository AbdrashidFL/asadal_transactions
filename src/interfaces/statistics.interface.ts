export interface IDiagramDataDoughnut {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
		borderColor: string[];
		borderWidth: number;
	}[];
}
export interface IDiagramDataBarChart {
	labels: string[];
	datasets: { label: string; data: number[]; backgroundColor: string }[];
}
export interface IDiagramsDataState {
	doughnut: IDiagramDataDoughnut;
	barChart: IDiagramDataBarChart;
}
