import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import type { TableProps } from 'antd/lib';
import logEvent from 'api/common/logEvent';

import { DashboardListEvents } from 'pages/DashboardsListPageV2/constants/events';

import type { DashboardListItem } from '../../utils/helpers';
import DashboardRow from '../DashboardRow/DashboardRow';

interface Props {
	dashboards: DashboardListItem[];
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
	canEdit: boolean;
	showUpdatedAt: boolean;
	showUpdatedBy: boolean;
	loading: boolean;
}

function DashboardsListContent({
	dashboards,
	page,
	pageSize,
	total,
	onPageChange,
	canEdit,
	showUpdatedAt,
	showUpdatedBy,
	loading,
}: Props): JSX.Element {
	const { t } = useTranslation('dashboard');

	const columns: TableProps<DashboardListItem>['columns'] = useMemo(
		() => [
			{
				title: t('dashboards_list_page_v2.title'),
				key: 'dashboard',
				render: (_, dashboard, index): JSX.Element => (
					<DashboardRow
						dashboard={dashboard}
						index={index}
						canEdit={canEdit}
						showUpdatedAt={showUpdatedAt}
						showUpdatedBy={showUpdatedBy}
					/>
				),
			},
		],
		[canEdit, showUpdatedAt, showUpdatedBy, t],
	);

	const paginationConfig = total > pageSize && {
		pageSize,
		showSizeChanger: false,
		onChange: (pageNumber: number): void => {
			void logEvent(DashboardListEvents.Paginated, { pageNumber });
			onPageChange(pageNumber);
		},
		current: page,
		total,
		hideOnSinglePage: true,
	};

	return (
		<Table
			columns={columns}
			dataSource={dashboards.map((d) => ({ ...d, key: d.id }))}
			showSorterTooltip
			loading={loading}
			showHeader={false}
			pagination={paginationConfig}
		/>
	);
}

export default DashboardsListContent;
