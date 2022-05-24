import React, {useCallback} from 'react';

import styles from './TableHeader.module.scss';
import {ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import notSorted from '../../assets/not-sorted.svg';
import sorted from '../../assets/sorted.svg';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {setSortSetup} from '../../store/slices/table';
import {IndexValue} from '../../types/IndexValue';

type Props = {
	columnSetups: ColumnSetup<IndexValue>[]
}

const TableHeader: React.FC<Props> = ({columnSetups}) => {
	const sortSetup = useAppSelector(state => state.table.sortSetup);
	const dispatch = useAppDispatch();

	const getColumnWidth = useCallback((setup: ColumnSetup<IndexValue>) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	return(<div className={styles.container}>
		{columnSetups.map(columnSetup => <button
			className={styles.column}
			key={columnSetup.title}
			style={getColumnWidth(columnSetup)}
			onClick={() => dispatch(setSortSetup({ property: columnSetup.property, sortAtoZ: (sortSetup.property === columnSetup.property ? !sortSetup.sortAtoZ : false)}))}
		>
			<span className={styles.title}>{columnSetup.title}</span>
			{sortSetup.property === columnSetup.property ?
				<img
					alt="sort arrow"
					src={sorted}
					className={styles.sort}
					style={sortSetup.sortAtoZ ? { transform: 'rotate(180deg)' } : {}}
				/> :
				<img alt="sort mark" src={notSorted} className={styles.sort}/>}
		</button>)}
	</div>);
};

export default TableHeader;
