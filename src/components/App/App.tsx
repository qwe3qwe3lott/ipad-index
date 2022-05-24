import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from '../MainLayout';
import AboutPage from '../../pages/AboutPage';
import MapPage from '../../pages/MapPage';
import TablePage from '../../pages/TablePage';
import AuthorsPage from '../../pages/AuthorsPage';
import {useIsOnline} from 'react-use-is-online';
import OffLinePage from '../../pages/OffLinePage';

const App: React.FC = () => {
	const {isOnline} = useIsOnline();

	return(<Routes>
		<Route path={'/'} element={<MainLayout/>}>
			<Route index element={<AboutPage/>}/>
			<Route path={'authors'} element={<AuthorsPage/>}/>
			<Route path={'map'} element={isOnline ? <MapPage/> : <OffLinePage/>}/>
			<Route path={'table'} element={isOnline ? <TablePage/> : <OffLinePage/>}/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Route>
	</Routes>);
};

export default App;
