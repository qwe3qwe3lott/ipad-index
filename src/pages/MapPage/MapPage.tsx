import React from 'react';

import MapFilter from '../../components/MapFilter';
import MapChart from '../../components/MapChart';

import styles from './MapPage.module.scss';

const MapPage: React.FC = () => {
	return (<section>
		<MapFilter/>
		<p className={styles.alert}>A little bit of data may not be displayed on the map. So use tab &quot;table&quot; to see the entire data set</p>
		<MapChart/>
	</section>);
};

export default MapPage;
