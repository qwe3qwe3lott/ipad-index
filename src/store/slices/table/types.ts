import {IndexValue} from '../../../types/IndexValue';
import {SortSetup} from '../../../types/SortSetup';

export enum RowsPerPage {
	FEW = 25,
	SOME = 50,
	SEVERAL = 75,
	MANY = 100
}

export type TableState = {
	selectedYear: number
	indexValues: IndexValue[]
	currentPage: number
	rowsPerPage: RowsPerPage
	sortSetup: SortSetup<IndexValue>
	isLoading: boolean
}