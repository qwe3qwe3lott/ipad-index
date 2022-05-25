import {ColumnWidthMetrics} from '../enums/ColumnWidthMetrics';
import {ColumnModes} from '../enums/ColumnModes';

export type ColumnSetup<T> = {
	title: string
	property: keyof T,
	width?: {
		value: number,
		metric: ColumnWidthMetrics
	},
	mode?: ColumnModes
}