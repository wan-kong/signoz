import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-restricted-imports
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SolidAlertTriangle } from '@signozhq/icons';
import { Flex } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { ResizeTable } from 'components/ResizeTable';
import { ENTITY_VERSION_V4 } from 'constants/app';
import { MAX_RPS_LIMIT } from 'constants/global';
import ResourceAttributesFilter from 'container/ResourceAttributesFilter';
import { useGetQueriesRange } from 'hooks/queryBuilder/useGetQueriesRange';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { useNotifications } from 'hooks/useNotifications';
import { useAppContext } from 'providers/App/App';
import { AppState } from 'store/reducers';
import { ServicesList } from 'types/api/metrics/getService';
import { GlobalReducer } from 'types/reducer/globalTime';
import { getTotalRPS } from 'utils/services';

import {
	COLUMN_TITLE_KEYS,
	ColumnKey,
	P99_LATENCY_TITLE_KEYS,
} from '../Columns/ColumnContants';
import { getColumns } from '../Columns/ServiceColumn';
import { ServiceMetricsTableProps } from '../types';
import { getServiceListFromQuery } from '../utils';

function ServiceMetricTable({
	topLevelOperations,
	queryRangeRequestData,
}: ServiceMetricsTableProps): JSX.Element {
	const {
		minTime,
		maxTime,
		selectedTime: globalSelectedInterval,
	} = useSelector<AppState, GlobalReducer>((state) => state.globalTime);

	const { notifications } = useNotifications();
	const { t } = useTranslation(['services']);

	const { isFetchingActiveLicense, trialInfo } = useAppContext();
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();

	const queries = useGetQueriesRange(queryRangeRequestData, ENTITY_VERSION_V4, {
		queryKey: [
			`GetMetricsQueryRange-${queryRangeRequestData[0].selectedTime}-${globalSelectedInterval}`,
			maxTime,
			minTime,
			globalSelectedInterval,
		],
		keepPreviousData: true,
		enabled: true,
		refetchOnMount: false,
		onError: (error) => {
			notifications.error({
				message: error.message,
			});
		},
	});

	const isLoading = queries.some((query) => query.isLoading);
	const services: ServicesList[] = useMemo(
		() =>
			getServiceListFromQuery({
				queries,
				topLevelOperations,
				isLoading,
			}),
		[isLoading, queries, topLevelOperations],
	);

	const { search } = useLocation();
	const tableColumns = useMemo(
		() =>
			getColumns(search, true, {
				[ColumnKey.Application]: t(
					COLUMN_TITLE_KEYS[ColumnKey.Application],
					'Application',
				),
				[ColumnKey.P99]: t(P99_LATENCY_TITLE_KEYS.metrics, 'P99 latency (in ns)'),
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
	const [RPS, setRPS] = useState(0);

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
		<div className="service-metric-table-container">
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
				loading={isLoading}
				dataSource={services}
				rowKey="serviceName"
				className="service-metrics-table"
			/>
		</div>
	);
}

export default ServiceMetricTable;
