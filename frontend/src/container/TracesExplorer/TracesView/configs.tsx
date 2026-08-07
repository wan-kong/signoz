import i18n from 'ReactI18';
import { generatePath, Link } from 'react-router-dom';
import type { TableColumnsType as ColumnsType } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import ROUTES from 'constants/routes';
import { getMs } from 'container/Trace/Filters/Panel/PanelBody/Duration/util';
import { DEFAULT_PER_PAGE_OPTIONS } from 'hooks/queryPagination';
import { ListItem } from 'types/api/widgets/getQuery';

export const PER_PAGE_OPTIONS: number[] = [10, ...DEFAULT_PER_PAGE_OPTIONS];

export const columns: ColumnsType<ListItem['data']> = [
	{
		title: String(
			i18n.t('root_service_name', 'Root Service Name', { ns: 'common' }),
		),
		dataIndex: 'service.name',
		key: 'serviceName',
	},
	{
		title: String(
			i18n.t('root_operation_name', 'Root Operation Name', { ns: 'common' }),
		),
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: String(
			i18n.t('root_duration_ms', 'Root Duration (in ms)', { ns: 'common' }),
		),
		dataIndex: 'duration_nano',
		key: 'durationNano',
		render: (duration: number): JSX.Element => (
			<Typography>{getMs(String(duration))}ms</Typography>
		),
	},
	{
		title: String(i18n.t('no_of_spans', 'No of Spans', { ns: 'common' })),
		dataIndex: 'span_count',
		key: 'span_count',
	},
	{
		title: String(i18n.t('trace_id', 'TraceID', { ns: 'common' })),
		dataIndex: 'trace_id',
		key: 'traceID',
		render: (traceID: string): JSX.Element => (
			<Link
				to={generatePath(ROUTES.TRACE_DETAIL, {
					id: traceID,
				})}
				data-testid="trace-id"
			>
				{traceID}
			</Link>
		),
	},
];
