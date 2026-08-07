import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Flex } from 'antd';
import { SolidAlertTriangle } from '@signozhq/icons';
import { Typography } from '@signozhq/ui/typography';
import { ResizeTable } from 'components/ResizeTable';
import { MAX_RPS_LIMIT } from 'constants/global';
import ResourceAttributesFilter from 'container/ResourceAttributesFilter';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { useAppContext } from 'providers/App/App';
import { getTotalRPS } from 'utils/services';

import {
	COLUMN_TITLE_KEYS,
	ColumnKey,
	P99_LATENCY_TITLE_KEYS,
} from '../Columns/ColumnContants';
import { getColumns } from '../Columns/ServiceColumn';
import ServiceTableProps from '../types';

function ServiceTraceTable({
	services,
	loading,
}: ServiceTableProps): JSX.Element {
	const { search } = useLocation();
	const [RPS, setRPS] = useState(0);
	const { t } = useTranslation(['services']);

	const { isFetchingActiveLicense, trialInfo } = useAppContext();
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();
	const tableColumns = useMemo(
		() =>
			getColumns(search, false, {
				[ColumnKey.Application]: t(
					COLUMN_TITLE_KEYS[ColumnKey.Application],
					'Application',
				),
				[ColumnKey.P99]: t(P99_LATENCY_TITLE_KEYS.traces, 'P99 latency (in ms)'),
				[ColumnKey.ErrorRate]: t(
					COLUMN_TITLE_KEYS[ColumnKey.ErrorRate],
					'Error Rate (% of total)',
				),
				[ColumnKey.Operations]: t(
					COLUMN_TITLE_KEYS[ColumnKey.Operations],
					'Operations Per Second',
				),
			}),
		[search, t],
	);

	useEffect(() => {
		if (
			!isFetchingActiveLicense &&
			trialInfo?.onTrial &&
			!trialInfo?.trialConvertedToSubscription &&
			isCloudUserVal
		) {
			if (services.length > 0) {
				const rps = getTotalRPS(services);
				setRPS(rps);
			} else {
				setRPS(0);
			}
		}
	}, [
		services,
		isCloudUserVal,
		isFetchingActiveLicense,
		trialInfo?.onTrial,
		trialInfo?.trialConvertedToSubscription,
	]);

	const paginationConfig = {
		defaultPageSize: 10,
		showTotal: (total: number, range: number[]): string =>
			t('table.pagination', {
				start: range[0],
				end: range[1],
				total,
				defaultValue: '{{start}}-{{end}} of {{total}} items',
			}),
	};
	return (
		<div className="service-traces-table-container">
			{RPS > MAX_RPS_LIMIT && (
				<Flex justify="left">
					<Typography.Title level={5} color="warning" style={{ marginTop: 0 }}>
						<SolidAlertTriangle size="md" />{' '}
						{t(
							'rps_over_100',
							'You are sending data at more than 100 RPS, your ingestion  may be rate limited. Please reach out to us via chat support or ',
						)}
						<a href="mailto:cloud-support@signoz.io">{t('email', 'email')}</a>
					</Typography.Title>
				</Flex>
			)}

			<ResourceAttributesFilter />

			<ResizeTable
				pagination={paginationConfig}
				columns={tableColumns}
				loading={loading}
				dataSource={services}
				rowKey="serviceName"
				className="service-traces-table"
			/>
		</div>
	);
}

export default ServiceTraceTable;
