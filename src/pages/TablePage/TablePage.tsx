import React from 'react';
import TableFilter from '../../components/TableFilter';
import Table from '../../components/Table';


const TablePage: React.FC = () => {
	return (<section>
		<TableFilter/>
		<Table/>
	</section>);
};

export default TablePage;
