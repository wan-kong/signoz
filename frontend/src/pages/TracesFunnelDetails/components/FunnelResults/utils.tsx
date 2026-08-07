import i18n from 'ReactI18';
import { Link } from 'react-router-dom';
import { getYAxisFormattedValue } from 'components/Graph/yAxisConfig';

export const topTracesTableColumns = [
	{
		title: i18n.t('utils.trace_id', 'TRACE ID', { ns: 'funnel_results' }),
		dataIndex: 'trace_id',
		key: 'trace_id',
		render: (traceId: string): JSX.Element => (
			<Link
				to={`/trace/${traceId}`}
				className="trace-id-cell"
				target="_blank"
				rel="noopener noreferrer"
			>
				{traceId}
			</Link>
		),
	},
	{
		title: i18n.t('utils.step_transition_duration', 'STEP TRANSITION DURATION', {
			ns: 'funnel_results',
		}),
		dataIndex: 'duration_ms',
		key: 'duration_ms',
		render: (value: string): string => getYAxisFormattedValue(`${value}`, 'ms'),
	},
];
