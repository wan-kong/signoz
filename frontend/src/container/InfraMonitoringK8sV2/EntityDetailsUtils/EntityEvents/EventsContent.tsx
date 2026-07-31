import { useMemo } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { ResizeTable } from 'components/ResizeTable';
import FieldRenderer from 'container/LogDetailedView/FieldRenderer';
import { DataType } from 'container/LogDetailedView/TableView';
import { useTranslation } from 'react-i18next';

import { translateInfraKey } from 'container/InfraMonitoringK8s/i18n';
import styles from './EventsContent.module.scss';

export function EventContents({
	data,
}: {
	data: Record<string, string> | undefined;
}): JSX.Element {
	const { t } = useTranslation('infraMonitoring');
	const tableData = useMemo(
		() =>
			data ? Object.keys(data).map((key) => ({ key, value: data[key] })) : [],
		[data],
	);

	const columns: ColumnsType<DataType> = [
		{
			title: translateInfraKey(t, 'display.key', 'Key'),
			dataIndex: 'key',
			key: 'key',
			width: 50,
			align: 'left',
			className: 'attribute-pin value-field-container',
			render: (field: string): JSX.Element => <FieldRenderer field={field} />,
		},
		{
			title: translateInfraKey(t, 'display.value', 'Value'),
			dataIndex: 'value',
			key: 'value',
			width: 50,
			align: 'left',
			ellipsis: true,
			className: 'attribute-name',
			render: (field: string): JSX.Element => <FieldRenderer field={field} />,
		},
	];

	return (
		<ResizeTable
			columns={columns}
			tableLayout="fixed"
			dataSource={tableData}
			pagination={false}
			showHeader={false}
			className={styles.eventContentContainer}
		/>
	);
}
