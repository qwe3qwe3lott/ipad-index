import React, {useMemo} from 'react';

import styles from './MapChart.module.scss';
import {Chart} from 'react-google-charts';
import {useAppSelector} from '../../hooks/typedReduxHooks';

const MapChart: React.FC = () => {
	const selectedRegion = useAppSelector(state => state.map.selectedRegion);
	const indexValues = useAppSelector(state => state.map.indexValues);

	const data = useMemo(() => {
		const data: (string | number)[][] = [['County', 'Index']];
		for (const indexValue of indexValues) {
			data.push([indexValue.country, indexValue.index]);
		}
		return data;
	}, [indexValues]);

	const options = {
		region: selectedRegion.code,
		colorAxis: {colors: ['#FFFFFF', '#00853F']},
		backgroundColor: '#6B6A6A',
		datalessRegionColor: '#F5DBE2',
		defaultColor: '#F5DBE2'
	};
	
	return(<div className={styles.container}>
		<Chart
			options={options}
			chartType="GeoChart"
			width="100%"
			data={data}
		/>
	</div>);
};

export default MapChart;
