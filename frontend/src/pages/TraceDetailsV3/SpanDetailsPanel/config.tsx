import { ReactNode } from 'react';
import { Badge } from '@signozhq/ui/badge';
import { useTranslation } from 'react-i18next';
import ExpandableValue from 'periscope/components/ExpandableValue';
import { SpanV3 } from 'types/api/trace/getTraceV3';

import styles from './SpanSummary.module.scss';
import { TraceIdField } from './TraceIdField';

interface HighlightedOption {
	key: string;
	label: string;
	render: (span: SpanV3) => ReactNode | null;
}

function StatusMessageValue({ span }: { span: SpanV3 }): JSX.Element {
	const { t } = useTranslation('trace_details');

	return (
		<ExpandableValue
			value={span.status_message}
			title={t('trace_details.summary.status_message_title')}
		>
			<Badge color="vanilla" className={styles.statusMessageBadge}>
				<span className={styles.badgeEllipsisText}>{span.status_message}</span>
			</Badge>
		</ExpandableValue>
	);
}

export const HIGHLIGHTED_OPTIONS: HighlightedOption[] = [
	{
		key: 'service',
		label: 'trace_details.summary.service',
		render: (span): ReactNode | null =>
			span['service.name'] ? (
				<Badge color="vanilla" className={styles.serviceBadge}>
					<span className={styles.serviceDot} />
					<span className={styles.badgeEllipsisText} title={span['service.name']}>
						{span['service.name']}
					</span>
				</Badge>
			) : null,
	},
	{
		key: 'statusCode',
		label: 'trace_details.summary.status_code',
		render: (span): ReactNode | null =>
			span.status_code_string ? (
				<Badge color="vanilla">{span.status_code_string}</Badge>
			) : null,
	},
	{
		key: 'traceId',
		label: 'trace_details.summary.trace_id',
		render: (span): ReactNode | null =>
			span.trace_id ? <TraceIdField span={span} /> : null,
	},
	{
		key: 'spanKind',
		label: 'trace_details.summary.span_kind',
		render: (span): ReactNode | null =>
			span.kind_string ? <Badge color="vanilla">{span.kind_string}</Badge> : null,
	},
	{
		key: 'statusMessage',
		label: 'trace_details.summary.status_message',
		render: (span): ReactNode | null =>
			span.status_message ? <StatusMessageValue span={span} /> : null,
	},
];
