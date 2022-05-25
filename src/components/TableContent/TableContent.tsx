import React from 'react';

import styles from './TableContent.module.scss';
import {ColumnSetup} from '../../types/ColumnSetup';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {IndexValue} from '../../types/IndexValue';
import loading from '../../assets/loading.svg';

import {
	useCurrentValues,
	useGetColumnWidth,
	useGetModifiedStyles,
	useListRef,
	useModifyValue
} from '../../hooks/tableHooks';

type Props = {
	columnSetups: ColumnSetup<IndexValue>[]
}

const TableContent: React.FC<Props> = ({columnSetups}) => {
	const indexValues = useAppSelector(state => state.table.indexValues);
	const currentPage = useAppSelector(state => state.table.currentPage);
	const rowsPerPage = useAppSelector(state => state.table.rowsPerPage);
	const isLoading = useAppSelector(state => state.table.isLoading);

	const getColumnWidth = useGetColumnWidth<IndexValue>();

	const currentIndexValues = useCurrentValues<IndexValue>(currentPage, rowsPerPage, indexValues);

	const listRef = useListRef(currentPage);

	const modifyValue = useModifyValue<IndexValue>();

	const getModifiedStyles = useGetModifiedStyles<IndexValue>();

	return(<ul className={[styles.container, (isLoading ? styles.loadingContainer : '')].join(' ')} ref={listRef}>
		{isLoading ? <img className={styles.loading} alt={'loading ring'} src={loading}/> :
			<>
				{currentIndexValues.map(indexValue => <li key={indexValue.id} className={styles.element}>
					{columnSetups.map(columnSetup => <span
						key={columnSetup.title}
						className={styles.span}
						style={{...getColumnWidth(columnSetup), ...getModifiedStyles(indexValue[columnSetup.property as keyof IndexValue], columnSetup.mode)}}
					>
						{modifyValue(indexValue[columnSetup.property as keyof IndexValue], columnSetup.mode)}
					</span>)}
				</li>)}
			</>
		}
	</ul>);
};

export default TableContent;
