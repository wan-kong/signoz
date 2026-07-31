import { Badge, BadgeColor } from '@signozhq/ui/badge';
import { SEVERITY_BADGE_COLORS } from 'components/Alerts/constants';
import LabelColumn from 'components/Alerts/LabelColumn';
import type { TableColumnDef } from 'components/TanStackTableView';
import TanStackTable from 'components/TanStackTableView';
import { DATE_TIME_FORMATS } from 'constants/dateTimeFormats';

import type { AlertRule } from './types';

const STATE_CONFIG: Record<string, { color: BadgeColor; label: string }> = {
	firing: { color: 'error', label: 'alert_rules.state.firing' },
	inactive: { color: 'success', label: 'OK' },
	pending: { color: 'warning', label: 'alert_rules.state.pending' },
	disabled: { color: 'secondary', label: 'alert_rules.state.disabled' },
};

export function getAlertRuleColumns(
	formatTimezoneAdjustedTimestamp: (date: string, format: string) => string,
	labels: {
		status: string;
		alertName: string;
		severity: string;
		labels: string;
		createdAt: string;
		createdBy: string;
		updatedAt: string;
		updatedBy: string;
		unknown: string;
		stateFiring: string;
		statePending: string;
		stateDisabled: string;
	},
): TableColumnDef<AlertRule>[] {
	const stateLabels: Record<string, string> = {
		'alert_rules.state.firing': labels.stateFiring,
		'alert_rules.state.pending': labels.statePending,
		'alert_rules.state.disabled': labels.stateDisabled,
		OK: 'OK',
	};

	return [
		{
			id: 'state',
			header: labels.status,
			accessorKey: 'state',
			width: { fixed: '100px' },
			enableSort: true,
			enableRemove: false,
			enableMove: false,
			cell: ({ row, value }): JSX.Element => {
				const state = String(value ?? '').toLowerCase();
				const config = STATE_CONFIG[state] ?? {
					color: 'secondary' as BadgeColor,
					label: labels.unknown,
				};
				return (
					<Badge
						color={config.color}
						variant="outline"
						testId={`alert-row-${row.id ?? ''}-state`}
					>
						{stateLabels[config.label] ?? config.label}
					</Badge>
				);
			},
		},
		{
			id: 'name',
			header: labels.alertName,
			accessorKey: 'alert',
			width: { default: '100%' },
			enableSort: true,
			enableRemove: false,
			enableMove: false,
			cell: ({ row, value }): JSX.Element => (
				<TanStackTable.Text
					title={value}
					data-testid={`alert-row-${row.id ?? ''}-name`}
				>
					{String(value ?? '-')}
				</TanStackTable.Text>
			),
		},
		{
			id: 'severity',
			header: labels.severity,
			accessorFn: (row) => row.labels?.severity ?? '',
			width: { fixed: '120px' },
			enableSort: true,
			enableMove: false,
			cell: ({ row, value }): JSX.Element => {
				const severity = String(value ?? '').toLowerCase();
				if (!severity) {
					return (
						<TanStackTable.Text data-testid={`alert-row-${row.id ?? ''}-severity`}>
							-
						</TanStackTable.Text>
					);
				}
				return (
					<Badge
						color={SEVERITY_BADGE_COLORS[severity] ?? 'secondary'}
						variant="outline"
						testId={`alert-row-${row.id ?? ''}-severity`}
					>
						{severity}
					</Badge>
				);
			},
		},
		{
			id: 'labels',
			header: labels.labels,
			accessorKey: 'labels',
			width: { default: '100%' },
			enableSort: false,
			enableMove: false,
			cell: ({ value }): JSX.Element => {
				const labels = value as Record<string, string> | undefined;
				if (!labels) {
					return <TanStackTable.Text>-</TanStackTable.Text>;
				}

				const tagKeys = Object.keys(labels).filter((k) => k !== 'severity');
				if (!tagKeys.length) {
					return <TanStackTable.Text>-</TanStackTable.Text>;
				}

				return <LabelColumn labels={tagKeys} value={labels} color="sakura" />;
			},
		},
		{
			id: 'createdAt',
			header: labels.createdAt,
			accessorKey: 'createdAt',
			width: { default: '100%' },
			enableSort: true,
			enableMove: false,
			defaultVisibility: false,
			cell: ({ value }): JSX.Element => (
				<TanStackTable.Text>
					{value
						? formatTimezoneAdjustedTimestamp(String(value), DATE_TIME_FORMATS.UTC_US)
						: '-'}
				</TanStackTable.Text>
			),
		},
		{
			id: 'createdBy',
			header: labels.createdBy,
			accessorKey: 'createdBy',
			width: { default: '100%' },
			enableSort: false,
			enableMove: false,
			defaultVisibility: false,
			cell: ({ value }): JSX.Element => (
				<TanStackTable.Text>{String(value ?? '-')}</TanStackTable.Text>
			),
		},
		{
			id: 'updatedAt',
			header: labels.updatedAt,
			accessorKey: 'updatedAt',
			width: { default: '100%' },
			enableSort: true,
			enableMove: false,
			defaultVisibility: false,
			cell: ({ value }): JSX.Element => (
				<TanStackTable.Text>
					{value
						? formatTimezoneAdjustedTimestamp(String(value), DATE_TIME_FORMATS.UTC_US)
						: '-'}
				</TanStackTable.Text>
			),
		},
		{
			id: 'updatedBy',
			header: labels.updatedBy,
			accessorKey: 'updatedBy',
			width: { default: '100%' },
			enableSort: false,
			enableMove: false,
			defaultVisibility: false,
			cell: ({ value }): JSX.Element => (
				<TanStackTable.Text>{String(value ?? '-')}</TanStackTable.Text>
			),
		},
	];
}
