import { IStateSliceTransaction } from '@/interfaces/store.interface';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '@/interfaces/transaction.interface';
import { api } from '@/api/api';

const initialState: IStateSliceTransaction = {
	transactions: [],
	transactionPage: null,
};

export const getTransactions = createAsyncThunk(
	'getTransactions',
	async (_, { rejectWithValue }) => {
		try {
			const { data }: { data: ITransaction[] } =
				await api.get(`/transactions`);
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);
export const getTransaction = createAsyncThunk(
	'getTransaction',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data }: { data: ITransaction } = await api.get(
				`/transactions/${id}`
			);
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);

export const getFilterTransaction = createAsyncThunk(
	'getFilterTransaction',
	async (queryParameter: string, { rejectWithValue }) => {
		try {
			const { data }: { data: ITransaction[] } = await api.get(
				`/transactions?${queryParameter}`
			);
			return data;
		} catch (e) {
			return rejectWithValue('');
		}
	}
);
export const getSearchingTransaction = createAsyncThunk(
	'getSearchingTransaction',
	async (text: string, { rejectWithValue }) => {
		try {
			const { data }: { data: ITransaction[] } = await api.get(
				`transactions/?search=${text}`
			);
			return data;
		} catch (e) {
			return rejectWithValue('HTTP error post request');
		}
	}
);

export const transactionSlice = createSlice({
	name: 'transactionSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTransactions.pending, () => {})
			.addCase(
				getTransactions.fulfilled,
				(state, action: PayloadAction<ITransaction[]>) => {
					state.transactions = action.payload;
				}
			)
			.addCase(getTransactions.rejected, (state) => {
				state.transactions = [];
			})

			.addCase(getTransaction.pending, () => {})
			.addCase(
				getTransaction.fulfilled,
				(state, action: PayloadAction<ITransaction>) => {
					state.transactionPage = action.payload;
				}
			)
			.addCase(getTransaction.rejected, (state) => {
				state.transactionPage = null;
			})

			.addCase(getFilterTransaction.pending, () => {})
			.addCase(
				getFilterTransaction.fulfilled,
				(state, action: PayloadAction<ITransaction[]>) => {
					state.transactions = action.payload;
				}
			)
			.addCase(getFilterTransaction.rejected, (state) => {
				state.transactions = [];
			})

			.addCase(getSearchingTransaction.pending, () => {})
			.addCase(
				getSearchingTransaction.fulfilled,
				(state, action: PayloadAction<ITransaction[]>) => {
					state.transactions = action.payload;
				}
			)
			.addCase(getSearchingTransaction.rejected, (state) => {
				state.transactions = [];
			});
	},
});
