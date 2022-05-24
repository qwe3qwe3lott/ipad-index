import React, {useEffect} from 'react';

import styles from './MapFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {fetchIndexValues, setRegion} from '../../store/slices/map';
import {fetchYears} from '../../store/slices/merge';

const MapFilter: React.FC = () => {
	const years = useAppSelector(state => state.merge.years);
	const selectedYear = useAppSelector(state => state.map.selectedYear);
	const regions = useAppSelector(state => state.map.regions);
	const selectedRegion = useAppSelector(state => state.map.selectedRegion);
	const isLoading = useAppSelector(state => state.map.isLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchYears());
	}, []);

	return(<div className={styles.container}>
		<h2 className={styles.title}>{!isLoading ? 'Index on the map' : 'Data loading...'}</h2>
		<div className={styles.filters}>
			<select className={styles.select} value={selectedRegion.label} onChange={(event) => dispatch(setRegion(event.target.value))}>
				{regions.map(region => <option key={region.label}>
					{region.label}
				</option>)}
			</select>
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
		</div>
	</div>);
};

export default MapFilter;
