import React, {useEffect} from 'react';

import styles from './TableFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {fetchIndexValues} from '../../store/slices/table';
import {fetchYears} from '../../store/slices/merge';

const TableFilter: React.FC = () => {
	const years = useAppSelector(state => state.merge.years);
	const selectedYear = useAppSelector(state => state.table.selectedYear);
	const isLoading = useAppSelector(state => state.table.isLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchYears());
	}, []);

	return(<div className={styles.container}>
		<h2 className={styles.title}>Index in the table</h2>
		<select
			className={styles.select}
			value={selectedYear}
			onChange={(event) => dispatch(fetchIndexValues(+event.target.value))}
			disabled={isLoading}
		>
			<option value="0" disabled hidden>Choose year</option>
			{years.map(year => <option key={year}>
				{year}
			</option>)}
		</select>
	</div>);
};

export default TableFilter;
