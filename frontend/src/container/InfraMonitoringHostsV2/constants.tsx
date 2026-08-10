import i18n from 'ReactI18';
import React from 'react';
import { Badge } from '@signozhq/ui/badge';
import { Progress } from '@signozhq/ui/progress';
import {
	InframonitoringtypesHostRecordDTO,
	InframonitoringtypesHostStatusDTO,
} from 'api/generated/services/sigNoz.schemas';
import { K8sDetailsMetadataConfig } from 'container/InfraMonitoringK8sV2/Base/K8sBaseDetails';
import { INFRA_MONITORING_ATTR_KEYS } from 'container/InfraMonitoringK8sV2/constants';
import { formatValueForExpression } from 'components/QueryBuilderV2/utils';
import { TextNoData } from 'container/InfraMonitoringK8sV2/components';
import { getStrokeColorForPercent } from 'container/InfraMonitoringK8sV2/components/EntityProgressBar.utils';
import { SelectedItemParams } from 'container/InfraMonitoringK8sV2/hooks';
import {
	getHostQueryPayload,
	hostWidgetInfo as baseHostWidgetInfo,
} from 'container/LogDetailedView/InfraMetrics/constants';

import infraHostsStyles from './InfraMonitoringHosts.module.scss';

export type HostDetailMetadataConfigType =
	K8sDetailsMetadataConfig<InframonitoringtypesHostRecordDTO>;
export const hostDetailsMetadataConfig: HostDetailMetadataConfigType[] = [
	{
		label: i18n.t('status', 'STATUS', { ns: 'infraMonitoring' }),
		labelKey: 'display.status_uppercase',
		getValue: (h): string =>
			h.status === InframonitoringtypesHostStatusDTO.active
				? 'ACTIVE'
				: 'INACTIVE',
		render: (value, h): React.ReactNode => {
			const isActive = h.status === InframonitoringtypesHostStatusDTO.active;
			return (
				<Badge
					variant="outline"
					className={`${infraHostsStyles.infraMonitoringTags} ${
						isActive ? infraHostsStyles.tagsActive : infraHostsStyles.tagsInactive
					}`}
				>
					{value}
				</Badge>
			);
		},
	},
	{
		label: i18n.t('operating_system', 'OPERATING SYSTEM', {
			ns: 'infraMonitoring',
		}),
		labelKey: 'display.operating_system_uppercase',
		getValue: (h): string => h.meta?.[INFRA_MONITORING_ATTR_KEYS.OS_TYPE] || '-',
		render: (value): React.ReactNode =>
			value !== '-' ? (
				<Badge variant="outline" className={infraHostsStyles.infraMonitoringTags}>
					{value}
				</Badge>
			) : (
				<TextNoData type="typography" />
			),
	},
	{
		label: i18n.t('cpu_usage', 'CPU USAGE', { ns: 'infraMonitoring' }),
		labelKey: 'display.cpu_usage_uppercase',
		getValue: (h): number => h.cpu * 100,
		render: (value): React.ReactNode => (
			<Progress
				percent={Number(Number(value).toFixed(1))}
				strokeColor={getStrokeColorForPercent('cpu', Number(value))}
				showInfo
			/>
		),
	},
	{
		label: i18n.t('memory_usage', 'MEMORY USAGE', { ns: 'infraMonitoring' }),
		labelKey: 'display.memory_usage_uppercase',
		getValue: (h): number => h.memory * 100,
		render: (value): React.ReactNode => (
			<Progress
				percent={Number(Number(value).toFixed(1))}
				strokeColor={getStrokeColorForPercent('memory', Number(value))}
				showInfo
			/>
		),
	},
];

export function getHostMetricsQueryPayload(
	host: InframonitoringtypesHostRecordDTO,
	start: number,
	end: number,
): ReturnType<typeof getHostQueryPayload> {
	return getHostQueryPayload(host.hostName, start, end, true);
}

const HOST_WIDGET_TITLE_KEYS: Record<string, string> = {
	'details.infra_metrics.charts.host_cpu_usage': 'display.host_cpu_usage',
	'details.infra_metrics.charts.host_memory_usage': 'display.host_memory_usage',
	'details.infra_metrics.charts.system_load_average':
		'display.system_load_average',
	'details.infra_metrics.charts.network_usage_bytes':
		'display.network_usage_bytes',
	'details.infra_metrics.charts.network_usage_packets':
		'display.network_usage_packets',
	'details.infra_metrics.charts.network_errors': 'display.network_errors',
	'details.infra_metrics.charts.network_drops': 'display.network_drops',
	'details.infra_metrics.charts.network_connections':
		'display.network_connections',
	'details.infra_metrics.charts.system_disk_io': 'display.system_disk_io',
	'details.infra_metrics.charts.system_disk_operations':
		'display.system_disk_operations',
	'details.infra_metrics.charts.queue_size': 'display.queue_size',
	'details.infra_metrics.charts.system_disk_operation_time':
		'display.system_disk_operation_time',
	'details.infra_metrics.charts.disk_usage_by_mountpoint':
		'display.disk_usage_by_mountpoint',
};

export const hostWidgetInfo = baseHostWidgetInfo.map((widget) => ({
	...widget,
	title: HOST_WIDGET_TITLE_KEYS[widget.title] ?? widget.title,
}));

export const hostGetSelectedItemExpression = (
	params: SelectedItemParams,
): string =>
	`${INFRA_MONITORING_ATTR_KEYS.HOST_NAME} = ${formatValueForExpression(params.selectedItem ?? '')}`;

export function hostInitialLogTracesExpression(
	host: InframonitoringtypesHostRecordDTO,
): string {
	const hostName = formatValueForExpression(host.hostName || '');
	return `${INFRA_MONITORING_ATTR_KEYS.HOST_NAME} = ${hostName}`;
}

export function hostInitialEventsExpression(
	_host: InframonitoringtypesHostRecordDTO,
): string {
	return '';
}

export const hostGetEntityName = (
	host: InframonitoringtypesHostRecordDTO,
): string => host.hostName;
