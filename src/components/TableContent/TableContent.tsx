import React, {useCallback, useEffect, useMemo, useRef} from 'react';

import styles from './TableContent.module.scss';
import {ColumnModes, ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {IndexValue} from '../../types/IndexValue';
import loading from '../../assets/loading.svg';

import scssVariables from '../../index.scss';

type Props = {
	columnSetups: ColumnSetup<IndexValue>[]
}

const TableContent: React.FC<Props> = ({columnSetups}) => {
	const indexValues = useAppSelector(state => state.table.indexValues);
	const currentPage = useAppSelector(state => state.table.currentPage);
	const rowsPerPage = useAppSelector(state => state.table.rowsPerPage);
	const isLoading = useAppSelector(state => state.table.isLoading);

	const getColumnWidth = useCallback((setup: ColumnSetup<IndexValue>) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	const currentIndexValues: IndexValue[] = useMemo(() => {
		const endIndex: number = currentPage * rowsPerPage;
		return indexValues.slice(endIndex - rowsPerPage, endIndex);
	}, [currentPage, rowsPerPage, indexValues]);

	const listRef = useRef<HTMLUListElement>(null);
	useEffect(() => {
		if (!listRef.current) return;
		listRef.current.scrollTo(0, 0);
	}, [currentPage]);

	const modifyValue = useCallback((value: IndexValue[keyof IndexValue], mode: ColumnModes | undefined) : IndexValue[keyof IndexValue] => {
		if (value === null) return 'no info';
		switch (mode) {
		case ColumnModes.PERCENT:
			if (isNaN(+value)) return value;
			else value = +value;
			return `${value < 0 ? '-' : ''}${Math.abs(value)}%`;
		default:
			return value;
		}
	}, []);

	const getModifyStyles = useCallback((value: IndexValue[keyof IndexValue], mode: ColumnModes | undefined) : object => {
		if (value === null) return {};
		switch (mode) {
		case ColumnModes.PERCENT:
			if (isNaN(+value)) return {};
			else value = +value;
			if (value > 0) return { color: scssVariables.seconradyColor };
			if (value < 0) return { color: scssVariables.secondaryOppositeColor };
			return {};
		default:
			return {};
		}
	}, []);

	return(<ul className={[styles.container, (isLoading ? styles.loadingContainer : '')].join(' ')} ref={listRef}>
		{isLoading ? <img className={styles.loading} alt={'loading ring'} src={loading}/> :
			<>
				{currentIndexValues.map(indexValue => <li key={indexValue.id} className={styles.element}>
					{columnSetups.map(columnSetup => <span
						key={columnSetup.title}
						className={styles.span}
						style={{...getColumnWidth(columnSetup), ...getModifyStyles(indexValue[columnSetup.property as keyof IndexValue], columnSetup.mode)}}
					>
						{modifyValue(indexValue[columnSetup.property as keyof IndexValue], columnSetup.mode)}
					</span>)}
				</li>)}
			</>
		}
	</ul>);
};

export default TableContent;
