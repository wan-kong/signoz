import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-restricted-imports
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Histogram, RefreshCw } from '@signozhq/icons';
import { Alert, Table } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import ROUTES from 'constants/routes';
import { IServiceName } from 'container/MetricsApplication/Tabs/types';
import useErrorNotification from 'hooks/useErrorNotification';
import { useQueryService } from 'hooks/useQueryService';
import useResourceAttribute from 'hooks/useResourceAttribute';
import { convertRawQueriesToTraceSelectedTags } from 'hooks/useResourceAttribute/utils';
import { AppState } from 'store/reducers';
import { GlobalReducer } from 'types/reducer/globalTime';
import { Tags } from 'types/reducer/trace';

import './ServiceTopLevelOperations.styles.scss';

export default function ServiceTopLevelOperations(): JSX.Element {
	const { t } = useTranslation('services');
	const { servicename: encodedServiceName } = useParams<IServiceName>();
	const { maxTime, minTime, selectedTime } = useSelector<
		AppState,
		GlobalReducer
	>((state) => state.globalTime);
	const servicename = decodeURIComponent(encodedServiceName);
	const { queries } = useResourceAttribute();
	const selectedTags = useMemo(
		() => (convertRawQueriesToTraceSelectedTags(queries) as Tags[]) || [],
		[queries],
	);

	const [topLevelOperations, setTopLevelOperations] = useState<string[]>([]);

	const { data, error, isLoading } = useQueryService({
		minTime,
		maxTime,
		selectedTime,
		selectedTags,
	});

	useErrorNotification(error);

	useEffect(() => {
		const selectedService = data?.find(
			(service) => service.serviceName === servicename,
		);

		setTopLevelOperations(selectedService?.dataWarning?.topLevelOps || []);
	}, [servicename, data]);

	const alertDesc = (): ReactNode => (
		<div className="">
			{t('top_level_operations.alert_part_1')}
			<a
				href="https://signoz.io/docs/userguide/metrics/"
				target="_blank"
				rel="noreferrer"
			>
				{' '}
				{t('top_level_operations.docs_link')}
			</a>
			. {t('top_level_operations.alert_part_2')}{' '}
			<a
				href="https://opentelemetry.io/docs/specs/otel/trace/api/#span"
				target="_blank"
				rel="noreferrer"
			>
				{' '}
				{t('top_level_operations.here_link')}
			</a>{' '}
			{t('top_level_operations.alert_part_3')}
		</div>
	);

	const columns = [
		{
			title: t('top_level_operations.column'),
			key: 'top-level-operation',
			render: (operation: string): JSX.Element => (
				<div className="top-level-operations-list-item" key={operation}>
					<Typography.Text> {operation} </Typography.Text>
				</div>
			),
		},
	];

	return (
		<div className="container">
			<Typography.Title level={5} className="top-level-operations-header">
				<Link to={ROUTES.APPLICATION}>
					<span className="breadcrumb">
						{' '}
						<Histogram size={12} />{' '}
						{t('top_level_operations.breadcrumb_services')}{' '}
					</span>
				</Link>
				<div className="divider">/</div>
				<Link to={`${ROUTES.APPLICATION}/${servicename}`}>
					<span className="breadcrumb">{servicename} </span>
				</Link>
			</Typography.Title>

			<div className="info-alert">
				<Alert message={alertDesc()} type="info" showIcon />
			</div>

			{isLoading && (
				<div className="loading-top-level-operations">
					<Typography.Title level={5}>
						<RefreshCw className="animate-spin" size="sm" />{' '}
						{t('top_level_operations.loading')}
					</Typography.Title>
				</div>
			)}

			{!isLoading && (
				<div className="top-level-operations-list">
					<Table
						columns={columns}
						bordered
						title={(): string => t('top_level_operations.page_title')}
						// @ts-expect-error
						dataSource={topLevelOperations}
						loading={isLoading}
						showHeader={false}
						pagination={{
							pageSize: 100,
							hideOnSinglePage: true,
							showTotal: (total: number, range: number[]): string =>
								t('top_level_operations.pagination', {
									start: range[0],
									end: range[1],
									total,
								}),
						}}
					/>
				</div>
			)}
		</div>
	);
}
