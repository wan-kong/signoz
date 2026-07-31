import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import {
	CloudintegrationtypesCollectedLogAttributeDTO,
	CloudintegrationtypesCollectedMetricDTO,
} from 'api/generated/services/sigNoz.schemas';
import { BarChart, ScrollText } from '@signozhq/icons';

import './CloudServiceDataCollected.styles.scss';

function CloudServiceDataCollected({
	logsData,
	metricsData,
}: {
	logsData: CloudintegrationtypesCollectedLogAttributeDTO[] | null | undefined;
	metricsData: CloudintegrationtypesCollectedMetricDTO[] | null | undefined;
}): JSX.Element {
	const { t } = useTranslation('common');
	const logsColumns = [
		{
			title: t('cloud_integrations.table_columns.name'),
			dataIndex: 'name',
			key: 'name',
			width: '30%',
		},
		{
			title: t('cloud_integrations.table_columns.path'),
			dataIndex: 'path',
			key: 'path',
			width: '40%',
		},
		{
			title: t('cloud_integrations.table_columns.facet_type'),
			dataIndex: 'type',
			key: 'type',
			width: '30%',
		},
	];

	const metricsColumns = [
		{
			title: t('cloud_integrations.table_columns.name'),
			dataIndex: 'name',
			key: 'name',
			width: '40%',
		},
		{
			title: t('cloud_integrations.table_columns.unit'),
			dataIndex: 'unit',
			key: 'unit',
			width: '30%',
		},
		{
			title: t('cloud_integrations.table_columns.type'),
			dataIndex: 'type',
			key: 'type',
			width: '30%',
		},
	];

	const tableProps = {
		pagination: { pageSize: 20, hideOnSinglePage: true },
		showHeader: true,
		size: 'middle' as const,
		bordered: false,
	};

	return (
		<div className="cloud-service-data-collected">
			{logsData && logsData.length > 0 && (
				<div className="cloud-service-data-collected-table">
					<div className="cloud-service-data-collected-table-heading">
						<ScrollText size={14} />
						{t('cloud_integrations.logs_heading')}
					</div>
					<Table
						columns={logsColumns}
						dataSource={logsData}
						{...tableProps}
						className="cloud-service-data-collected-table-logs"
					/>
				</div>
			)}
			{metricsData && metricsData.length > 0 && (
				<div className="cloud-service-data-collected-table">
					<div className="cloud-service-data-collected-table-heading">
						<BarChart size={14} />
						{t('cloud_integrations.metrics_heading')}
					</div>
					<Table
						columns={metricsColumns}
						dataSource={metricsData}
						{...tableProps}
						className="cloud-service-data-collected-table-metrics"
					/>
				</div>
			)}
		</div>
	);
}

export default CloudServiceDataCollected;
