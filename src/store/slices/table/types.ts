import {IndexValue} from '../../../types/IndexValue';
import {SortSetup} from '../../../types/SortSetup';
import {RowsPerPage} from '../../../enums/RowsPerPage';

export type TableState = {
	selectedYear: number
	indexValues: IndexValue[]
	currentPage: number
	rowsPerPage: RowsPerPage
	sortSetup: SortSetup<IndexValue>
	isLoading: boolean
}