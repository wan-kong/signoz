import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-restricted-imports
import { useSelector } from 'react-redux';
import { Loader, Search } from '@signozhq/icons';
import { Color } from '@signozhq/design-tokens';
import {
	Button,
	Flex,
	Input,
	InputRef,
	Space,
	Spin,
	TableColumnsType,
	Tooltip,
} from 'antd';
import { Progress } from '@signozhq/ui/progress';
import { Typography } from '@signozhq/ui/typography';
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import logEvent from 'api/common/logEvent';
import {
	getQueueOverview,
	QueueOverviewResponse,
} from 'api/messagingQueues/celery/getQueueOverview';
import { ResizeTable } from 'components/ResizeTable';
import { LOCALSTORAGE } from 'constants/localStorage';
import { QueryParams } from 'constants/query';
import useDragColumns from 'hooks/useDragColumns';
import { getDraggedColumns } from 'hooks/useDragColumns/utils';
import useUrlQuery from 'hooks/useUrlQuery';
import { isEmpty } from 'lodash-es';
import { AppState } from 'store/reducers';
import { GlobalReducer } from 'types/reducer/globalTime';
import { formatNumericValue } from 'utils/numericUtils';

import './CeleryOverviewTable.styles.scss';

const INITIAL_PAGE_SIZE = 20;

export type RowData = {
	key: string | number;
	[key: string]: string | number;
};

function ProgressRender(item: string | number): JSX.Element {
	const percent = Number(Number(item).toFixed(1));
	return (
		<div className="progress-container">
			<Progress
				percent={percent}
				strokeLinecap="butt"
				showInfo
				strokeColor={((): string => {
					const cpuPercent = percent;
					if (cpuPercent >= 90) {
						return Color.BG_SAKURA_500;
					}
					if (cpuPercent >= 60) {
						return Color.BG_AMBER_500;
					}
					return Color.BG_FOREST_500;
				})()}
				className="progress-bar"
			/>
		</div>
	);
}

function getTableData(data: QueueOverviewResponse['data']): RowData[] {
	if (data?.length === 0) {
		return [];
	}

	const columnOrder = [
		'service_name',
		'span_name',
		'messaging_system',
		'destination',
		'kind_string',
		'error_percentage',
		'p95_latency',
		'throughput',
	];

	const tableData: RowData[] =
		data?.map((row, index: number): RowData => {
			const rowData: Record<string, string | number> = {};
			columnOrder.forEach((key) => {
				const value = row.data[key as keyof typeof row.data];
				if (typeof value === 'string' || typeof value === 'number') {
					rowData[key] = value;
				}
			});
			Object.entries(row.data).forEach(([key, value]) => {
				if (
					!columnOrder.includes(key) &&
					(typeof value === 'string' || typeof value === 'number')
				) {
					rowData[key] = value;
				}
			});

			return {
				...rowData,
				key: index,
			};
		}) || [];

	return tableData;
}

type Filter = {
	key: {
		key: string;
		dataType: string;
	};
	op: string;
	value: string[];
};

type FilterConfig = {
	paramName: string;
	operator: string;
	key: string;
};

function makeFilters(urlQuery: URLSearchParams): Filter[] {
	const filterConfigs: FilterConfig[] = [
		{ paramName: QueryParams.destination, key: 'destination', operator: 'in' },
		{ paramName: QueryParams.msgSystem, key: 'queue', operator: 'in' },
		{ paramName: QueryParams.kindString, key: 'kind_string', operator: 'in' },
		{ paramName: QueryParams.service, key: 'service.name', operator: 'in' },
		{ paramName: QueryParams.spanName, key: 'name', operator: 'in' },
	];

	return filterConfigs
		.map(({ paramName, operator, key }) => {
			const value = urlQuery.get(paramName);
			if (!value) {
				return null;
			}

			return {
				key: {
					key,
					dataType: 'string',
				},
				op: operator,
				value: value.split(','),
			};
		})
		.filter((filter): filter is Filter => filter !== null);
}

// Column title keys — referenced inline within the component useMemo
const COLUMN_TITLE_KEYS: Record<string, string> = {
	service_name: 'celery_overview_table.columns.service_name',
	span_name: 'celery_overview_table.columns.span_name',
	messaging_system: 'celery_overview_table.columns.messaging_system',
	destination: 'celery_overview_table.columns.destination',
	kind_string: 'celery_overview_table.columns.kind',
	error_percentage: 'celery_overview_table.columns.error_percentage',
	p95_latency: 'celery_overview_table.columns.latency_p95',
	throughput: 'celery_overview_table.columns.throughput',
};

const tooltipRender = (item: string): JSX.Element => (
	<Tooltip placement="topLeft" title={item}>
		{item}
	</Tooltip>
);

export default function CeleryOverviewTable({
	onRowClick,
}: {
	onRowClick: (record: RowData) => void;
}): JSX.Element {
	const { t } = useTranslation('common');
	const [tableData, setTableData] = useState<RowData[]>([]);

	const { minTime, maxTime } = useSelector<AppState, GlobalReducer>(
		(state) => state.globalTime,
	);

	const { mutate: getOverviewData, isLoading } = useMutation(getQueueOverview, {
		onSuccess: (data) => {
			if (data?.payload) {
				setTableData(getTableData(data?.payload));
			} else if (isEmpty(data?.payload)) {
				setTableData([]);
			}
		},
	});

	const urlQuery = useUrlQuery();
	const filters = useMemo(() => makeFilters(urlQuery), [urlQuery]);

	useEffect(() => {
		getOverviewData({
			start: minTime,
			end: maxTime,
			filters: {
				items: filters,
				op: 'AND',
			},
		});
	}, [getOverviewData, minTime, maxTime, filters]);

	const { draggedColumns, onDragColumns } = useDragColumns<RowData>(
		LOCALSTORAGE.CELERY_OVERVIEW_COLUMNS,
	);

	const [searchText, setSearchText] = useState('');
	const searchInput = useRef<InputRef>(null);

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
	): void => {
		confirm();
		setSearchText(selectedKeys[0]);
	};

	const handleReset = (
		clearFilters: () => void,
		confirm: FilterDropdownProps['confirm'],
	): void => {
		clearFilters();
		setSearchText('');
		confirm();
	};

	const [sortedInfo, setSortedInfo] = useState<{
		columnKey: string;
		order: 'ascend' | 'descend';
	}>({
		columnKey: 'error_percentage',
		order: 'descend',
	});

	// Build columns inline — t() from useTranslation is available via closure
	const columns = useMemo(() => {
		if (tableData?.length === 0) {
			return [];
		}

		const baseColumns: TableColumnsType<RowData> = [
			{
				title: t(COLUMN_TITLE_KEYS.service_name),
				dataIndex: 'service_name',
				key: 'service_name',
				ellipsis: { showTitle: false },
				width: 200,
				sorter: (a: RowData, b: RowData): number =>
					String(a.service_name).localeCompare(String(b.service_name)),
				render: tooltipRender,
				fixed: 'left' as const,
			},
			{
				title: t(COLUMN_TITLE_KEYS.span_name),
				dataIndex: 'span_name',
				key: 'span_name',
				ellipsis: { showTitle: false },
				width: 200,
				sorter: (a: RowData, b: RowData): number =>
					String(a.span_name).localeCompare(String(b.span_name)),
				render: tooltipRender,
			},
			{
				title: t(COLUMN_TITLE_KEYS.messaging_system),
				dataIndex: 'messaging_system',
				key: 'messaging_system',
				ellipsis: { showTitle: false },
				width: 200,
				sorter: (a: RowData, b: RowData): number =>
					String(a.messaging_system).localeCompare(String(b.messaging_system)),
				render: tooltipRender,
			},
			{
				title: t(COLUMN_TITLE_KEYS.destination),
				dataIndex: 'destination',
				key: 'destination',
				ellipsis: { showTitle: false },
				render: tooltipRender,
				width: 200,
				sorter: (a: RowData, b: RowData): number =>
					String(a.destination).localeCompare(String(b.destination)),
			},
			{
				title: t(COLUMN_TITLE_KEYS.kind_string),
				dataIndex: 'kind_string',
				key: 'kind_string',
				ellipsis: { showTitle: false },
				width: 100,
				sorter: (a: RowData, b: RowData): number =>
					String(a.kind_string).localeCompare(String(b.kind_string)),
				render: tooltipRender,
			},
			{
				title: t(COLUMN_TITLE_KEYS.error_percentage),
				dataIndex: 'error_percentage',
				key: 'error_percentage',
				ellipsis: { showTitle: false },
				width: 200,
				sorter: (a: RowData, b: RowData): number => {
					const aValue = Number(a.error_percentage);
					const bValue = Number(b.error_percentage);
					return aValue - bValue;
				},
				render: ProgressRender,
			},
			{
				title: t(COLUMN_TITLE_KEYS.p95_latency),
				dataIndex: 'p95_latency',
				key: 'p95_latency',
				ellipsis: { showTitle: false },
				width: 100,
				sorter: (a: RowData, b: RowData): number => {
					const aValue = Number(a.p95_latency);
					const bValue = Number(b.p95_latency);
					return aValue - bValue;
				},
				render: formatNumericValue,
			},
			{
				title: t(COLUMN_TITLE_KEYS.throughput),
				dataIndex: 'throughput',
				key: 'throughput',
				ellipsis: { showTitle: false },
				width: 100,
				sorter: (a: RowData, b: RowData): number => {
					const aValue = Number(a.throughput);
					const bValue = Number(b.throughput);
					return aValue - bValue;
				},
				render: formatNumericValue,
			},
		];

		// Add search props to each column
		const columnsWithSearch = baseColumns.map((item) => ({
			...item,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
				close,
			}: FilterDropdownProps): JSX.Element => (
				<div style={{ padding: 8 }} onKeyDown={(e): void => e.stopPropagation()}>
					<Input
						ref={searchInput}
						placeholder={t('search.placeholder', { field: item.key?.toString() })}
						value={selectedKeys[0]}
						onChange={(e): void =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={(): void => handleSearch(selectedKeys as string[], confirm)}
						style={{ marginBottom: 8, display: 'block' }}
					/>
					<Space>
						<Button
							type="primary"
							size="small"
							onClick={(): void => handleSearch(selectedKeys as string[], confirm)}
						>
							<Flex align="center" gap={4}>
								<Search size="md" />
								{t('search.button')}
							</Flex>
						</Button>
						<Button
							onClick={(): void => clearFilters && handleReset(clearFilters, confirm)}
							size="small"
							style={{ width: 90 }}
						>
							{t('search.reset')}
						</Button>
						<Button
							type="link"
							size="small"
							onClick={(): void => {
								close();
							}}
						>
							{t('search.close')}
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered: boolean): JSX.Element => (
				<Search
					style={{ color: filtered ? Color.BG_ROBIN_500 : undefined }}
					size="md"
				/>
			),
			onFilter: (value: unknown, record: RowData): boolean =>
				record[item.key?.toString() || '']
					.toString()
					.toLowerCase()
					.includes((value as string).toLowerCase()),
			...(item.key === 'error_percentage' && {
				defaultSortOrder: 'descend' as const,
			}),
			sortOrder: sortedInfo.columnKey === item.key ? sortedInfo.order : undefined,
		}));

		return getDraggedColumns<RowData>(columnsWithSearch, draggedColumns);
	}, [tableData, draggedColumns, sortedInfo, t, handleSearch, handleReset]);

	const handleDragColumn = useCallback(
		(fromIndex: number, toIndex: number) =>
			onDragColumns(columns, fromIndex, toIndex),
		[columns, onDragColumns],
	);

	const paginationConfig = useMemo(
		() =>
			tableData?.length > INITIAL_PAGE_SIZE && {
				pageSize: INITIAL_PAGE_SIZE,
				showTotal: (total: number, range: number[]): JSX.Element => (
					<>
						<Typography.Text className="numbers">
							{range[0]} &#8212; {range[1]}
						</Typography.Text>
						<Typography.Text className="total">
							{' '}
							{t('of')} {total}
						</Typography.Text>
					</>
				),
				showSizeChanger: false,
				hideOnSinglePage: true,
			},
		[tableData],
	);

	const handleRowClick = (record: RowData): void => {
		onRowClick(record);
		logEvent('MQ Overview Page: Right Panel', { ...record });
	};

	const getFilteredData = useCallback(
		(data: RowData[]): RowData[] => {
			if (!searchText) {
				return data;
			}

			const searchLower = searchText.toLowerCase();
			return data.filter((record) =>
				Object.values(record).some(
					(value) =>
						value !== undefined &&
						value.toString().toLowerCase().includes(searchLower),
				),
			);
		},
		[searchText],
	);

	const filteredData = useMemo(
		() => getFilteredData(tableData),
		[getFilteredData, tableData],
	);

	const prevTableDataRef = useRef<string>();

	useEffect(() => {
		if (tableData.length > 0) {
			const currentTableData = JSON.stringify(tableData);

			if (currentTableData !== prevTableDataRef.current) {
				logEvent(`MQ Overview Page: List rendered`, {
					dataRender: tableData.length,
				});
				prevTableDataRef.current = currentTableData;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(tableData)]);

	return (
		<div className="celery-overview-table-container">
			<Input.Search
				placeholder={t('celery_overview_table.search_placeholder')}
				onChange={(e): void => setSearchText(e.target.value)}
				value={searchText}
				allowClear
			/>
			<ResizeTable
				className="celery-overview-table"
				pagination={paginationConfig}
				size="middle"
				columns={columns}
				dataSource={filteredData}
				bordered={false}
				loading={{
					spinning: isLoading,
					indicator: (
						<Spin indicator={<Loader size={14} className="animate-spin" />} />
					),
				}}
				locale={{
					emptyText: isLoading ? null : (
						<Typography.Text>{t('celery_overview_table.no_data')}</Typography.Text>
					),
				}}
				scroll={{ x: 'max-content' }}
				showSorterTooltip
				onDragColumn={handleDragColumn}
				onRow={(record): { onClick: () => void; className: string } => ({
					onClick: (): void => handleRowClick(record),
					className: 'clickable-row',
				})}
				tableLayout="fixed"
				onChange={(_pagination, _filters, sorter): void => {
					setSortedInfo({
						columnKey: (sorter as { columnKey: string }).columnKey,
						order: (sorter as { order: 'ascend' | 'descend' }).order,
					});
				}}
			/>
		</div>
	);
}
