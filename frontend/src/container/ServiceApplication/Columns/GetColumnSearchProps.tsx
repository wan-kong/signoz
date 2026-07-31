import { Link } from 'react-router-dom';
import { Info, Search } from '@signozhq/icons';
import { Popconfirm, PopconfirmProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import ROUTES from 'constants/routes';
import { routeConfig } from 'container/SideNav/config';
import { getQueryString } from 'container/SideNav/helper';
import history from 'lib/history';
import { useTranslation } from 'react-i18next';
import { ServicesList } from 'types/api/metrics/getService';

import { FilterDropdown } from '../Filter/FilterDropdown';

import '../ServiceApplication.styles.scss';

const MAX_TOP_LEVEL_OPERATIONS = 2500;

function HighTopLevelOperationsPopoverDesc({
	metrics,
}: {
	metrics: string;
}): JSX.Element {
	const { t } = useTranslation(['services']);
	return (
		<div className="popover-description">
			{t('top_level_operations.too_many_description', { serviceName: metrics })}
		</div>
	);
}

function ServiceNameCell({
	metrics,
	record,
	search,
}: {
	metrics: string;
	record: ServicesList;
	search: string;
}): JSX.Element {
	const { t } = useTranslation(['services']);
	const urlParams = new URLSearchParams(search);
	const avialableParams = routeConfig[ROUTES.SERVICE_METRICS];
	const queryString = getQueryString(avialableParams, urlParams);
	const topLevelOperations = record?.dataWarning?.topLevelOps || [];

	const handleShowTopLevelOperations: PopconfirmProps['onConfirm'] = () => {
		history.push(
			`${ROUTES.APPLICATION}/${encodeURIComponent(metrics)}/top-level-operations`,
		);
	};

	const hasHighTopLevelOperations =
		topLevelOperations &&
		Array.isArray(topLevelOperations) &&
		topLevelOperations.length > MAX_TOP_LEVEL_OPERATIONS;

	return (
		<div className={`serviceName ${hasHighTopLevelOperations ? 'error' : ''} `}>
			{hasHighTopLevelOperations && (
				<Popconfirm
					title={t('top_level_operations.too_many_title')}
					description={<HighTopLevelOperationsPopoverDesc metrics={metrics} />}
					placement="right"
					overlayClassName="service-high-top-level-operations"
					onConfirm={handleShowTopLevelOperations}
					trigger={['hover']}
					showCancel={false}
					okText={t('top_level_operations.show')}
				>
					<Info size={14} />
				</Popconfirm>
			)}

			<Link
				to={`${ROUTES.APPLICATION}/${encodeURIComponent(
					metrics,
				)}?${queryString.join('')}`}
			>
				{metrics}
			</Link>
		</div>
	);
}

export const getColumnSearchProps = (
	dataIndex: keyof ServicesList,
	search: string,
): ColumnType<ServicesList> => ({
	filterDropdown: (props): JSX.Element => <FilterDropdown {...props} />,
	filterIcon: <Search size="md" />,
	onFilter: (
		value: string | number | boolean,
		record: ServicesList,
	): boolean => {
		if (record[dataIndex]) {
			return (
				record[dataIndex]
					?.toString()
					.toLowerCase()
					.includes(value.toString().toLowerCase()) || false
			);
		}

		return false;
	},
	render: (metrics: string, record: ServicesList): JSX.Element => (
		<ServiceNameCell metrics={metrics} record={record} search={search} />
	),
});
