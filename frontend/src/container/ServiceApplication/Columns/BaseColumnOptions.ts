import type { TableColumnsType as ColumnsType } from 'antd';
import { ServicesList } from 'types/api/metrics/getService';

import { ColumnKey, ColumnWidth, SORTING_ORDER } from './ColumnContants';

export const getBaseColumnOptions = (
	columnTitle: Record<ColumnKey, string>,
): ColumnsType<ServicesList> => {
	return [
		{
			title: columnTitle[ColumnKey.Application],
			dataIndex: ColumnKey.Application,
			width: ColumnWidth.Application,
			key: ColumnKey.Application,
		},
		{
			dataIndex: ColumnKey.P99,
			key: ColumnKey.P99,
			width: ColumnWidth.P99,
			defaultSortOrder: SORTING_ORDER,
		},
		{
			title: columnTitle[ColumnKey.ErrorRate],
			dataIndex: ColumnKey.ErrorRate,
			key: ColumnKey.ErrorRate,
			width: 150,
		},
		{
			title: columnTitle[ColumnKey.Operations],
			dataIndex: ColumnKey.Operations,
			key: ColumnKey.Operations,
			width: ColumnWidth.Operations,
		},
	];
};
