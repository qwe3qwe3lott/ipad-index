import React from 'react';

import MapFilter from '../../components/MapFilter';
import MapChart from '../../components/MapChart';

const MapPage: React.FC = () => {
	return (<section>
		<MapFilter/>
		<MapChart/>
	</section>);
};

export default MapPage;
