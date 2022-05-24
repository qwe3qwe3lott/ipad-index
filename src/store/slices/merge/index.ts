import {MergeState} from './types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IndexValue} from '../../../types/IndexValue';
import {RootState} from '../../index';

const initialState: MergeState = {
	years: [],
	indexValuesThrowYears: {}
};

const mergeSlice = createSlice({
	name: 'merge',
	initialState,
	reducers: {
		setIndexValues(state, action: PayloadAction<{year: number, indexValues: IndexValue[]}>) {
			state.indexValuesThrowYears[action.payload.year] = action.payload.indexValues;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchYears.fulfilled, ((state, action) => {
				state.years = action.payload;
			}));
	}
});

export const fetchYears = createAsyncThunk<number[], undefined, {state: RootState}>(
	'merge/fetchYears',
	async function () {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getIPADYears`);
		if (!response.ok) return [];
		return await response.json() as number[];
	},
	{
		condition: (_, {getState}): boolean => getState().merge.years.length === 0
	}
);

export const {setIndexValues} = mergeSlice.actions;
export default mergeSlice.reducer;