import {IndexValue} from '../../../types/IndexValue';

export type MergeState = {
	years: number[]
	indexValuesThrowYears: {
		[key: number]: IndexValue[]
	};
}