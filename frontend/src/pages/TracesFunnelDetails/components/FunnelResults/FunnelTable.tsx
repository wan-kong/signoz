import { useTranslation } from 'react-i18next';
import { Empty, Table, TableColumnProps as ColumnProps, Tooltip } from 'antd';

import solidInfoCircleUrl from '@/assets/Icons/solid-info-circle.svg';

import './FunnelTable.styles.scss';

interface FunnelTableProps {
	loading?: boolean;
	data?: any[];
	columns: Array<ColumnProps<any>>;
	title: string;
	tooltip?: string;
}

function FunnelTable({
	loading = false,
	data = [],
	columns = [],
	title,
	tooltip,
}: FunnelTableProps): JSX.Element {
	const { t } = useTranslation('funnel_results');

	return (
		<div className="funnel-table">
			<div className="funnel-table__header">
				<div className="funnel-table__title">{title}</div>
				<div className="funnel-table__actions">
					<Tooltip title={tooltip ?? null}>
						<img src={solidInfoCircleUrl} alt={t('funnel_table.info_alt', 'info')} />
					</Tooltip>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={data}
				loading={loading}
				pagination={false}
				locale={{
					emptyText: loading ? null : <Empty />,
				}}
				scroll={{ x: true }}
				tableLayout="fixed"
				rowClassName={(_, index): string =>
					index % 2 === 0 ? 'table-row-dark' : 'table-row-light'
				}
			/>
		</div>
	);
}

FunnelTable.defaultProps = {
	loading: false,
	data: [],
	tooltip: '',
};

export default FunnelTable;
