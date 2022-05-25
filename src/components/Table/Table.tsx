import React from 'react';

import styles from './Table.module.scss';
import TableHeader from '../TableHeader';
import TableContent from '../TableContent';
import TableFooter from '../TableFooter';
import {ColumnSetup} from '../../types/ColumnSetup';
import {IndexValue} from '../../types/IndexValue';
import {ColumnModes} from '../../enums/ColumnModes';
import {ColumnWidthMetrics} from '../../enums/ColumnWidthMetrics';

const Table: React.FC = () => {
	const columnSetups: ColumnSetup<IndexValue>[] = [
		{ title: 'country', property: 'country'},
		{ title: 'index', property: 'index', width: {value: 6, metric: ColumnWidthMetrics.EM} },
		{ title: 'dynamic', property: 'dynamic', width: {value: 7, metric: ColumnWidthMetrics.EM}, mode: ColumnModes.PERCENT }
	];

	return(<div className={styles.container}>
		<TableHeader columnSetups={columnSetups}/>
		<TableContent columnSetups={columnSetups}/>
		<TableFooter/>
	</div>);
};

export default Table;
