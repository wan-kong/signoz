import React from 'react';
import { Tooltip } from 'antd';
import { Badge } from '@signozhq/ui/badge';
import { HostData } from 'api/infraMonitoring/getHostLists';
import TanStackTable, { TableColumnDef } from 'components/TanStackTableView';
import { useTranslation } from 'react-i18next';
import { getGroupByEl } from 'container/InfraMonitoringK8s/Base/utils';
import {
	EntityProgressBar,
	ExpandButtonWrapper,
	ValidateColumnValueWrapper,
} from 'container/InfraMonitoringK8s/components';
import { InfraMonitoringEntity } from 'container/InfraMonitoringK8s/constants';
import { useInfraMonitoringGroupBy } from 'container/InfraMonitoringK8s/hooks';
import EntityGroupHeader from 'container/InfraMonitoringK8s/Base/EntityGroupHeader';

import { HostnameCell } from './utils';

import styles from './table.module.scss';
import { Container, Info } from '@signozhq/icons';

function hostRowSource(host: HostData): { meta: Record<string, string> } {
	return {
		meta: {
			...(host.meta ?? {}),
			host_name: host.hostName ?? '',
			'host.name': host.hostName ?? '',
			os_type: host.os ?? '',
			'os.type': host.os ?? '',
		},
	};
}

export function getHostRowKey(host: HostData): string {
	return host.hostName || 'unknown';
}

export function getHostItemKey(host: HostData): string {
	return host.hostName ?? '';
}

function HostGroupCell({ row }: { row: HostData }): JSX.Element {
	const [groupBy] = useInfraMonitoringGroupBy();
	const synthetic = hostRowSource(row);
	return getGroupByEl(synthetic, groupBy) as JSX.Element;
}

function HostStatusHeader(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.statusHeader}>
			{t('display.status', { defaultValue: 'Status' })}
			<Tooltip
				title={t('display.sent_system_metrics_in_last_10_mins', {
					defaultValue: 'Sent system metrics in last 10 mins',
				})}
			>
				<Info size="md" />
			</Tooltip>
		</div>
	);
}

function HostStatusBadge({ active }: { active: boolean }): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<Badge
			className={`${styles.statusTag} ${
				active ? styles.statusTagActive : styles.statusTagInactive
			}`}
		>
			{t(active ? 'display.active_uppercase' : 'display.inactive_uppercase', {
				defaultValue: active ? 'ACTIVE' : 'INACTIVE',
			})}
		</Badge>
	);
}

function CpuUsageHeader(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.columnHeaderRight}>
			{t('display.cpu_usage', { defaultValue: 'CPU Usage' })}
		</div>
	);
}

function MemoryUsageHeader(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={`${styles.columnHeaderRight} ${styles.memoryUsageHeader}`}>
			{t('display.memory_usage', { defaultValue: 'Memory Usage' })}
			<Tooltip
				title={t('display.excluding_cache_memory', {
					defaultValue: 'Excluding cache memory',
				})}
			>
				<Info size="md" />
			</Tooltip>
		</div>
	);
}

function IoWaitHeader(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.columnHeaderRight}>
			{t('display.io_wait', { defaultValue: 'IOWait' })}
		</div>
	);
}

function LoadAverageHeader(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.columnHeaderRight}>
			{t('display.load_avg', { defaultValue: 'Load Avg' })}
		</div>
	);
}

export const hostColumnsConfig: TableColumnDef<HostData>[] = [
	{
		id: 'hostGroup',
		header: (): React.ReactNode => (
			<EntityGroupHeader title="display.host_group_uppercase" />
		),
		accessorFn: (row): string => row.hostName ?? '',
		width: { min: 300 },
		enableSort: false,
		enableRemove: false,
		enableMove: false,
		pin: 'left',
		visibilityBehavior: 'hidden-on-collapse',
		cell: ({ row, isExpanded, toggleExpanded }): React.ReactNode => (
			<ExpandButtonWrapper isExpanded={isExpanded} toggleExpanded={toggleExpanded}>
				<HostGroupCell row={row} />
			</ExpandButtonWrapper>
		),
	},
	{
		id: 'hostName',
		header: (): React.ReactNode => (
			<EntityGroupHeader title="display.hostname" icon={<Container size={14} />} />
		),
		accessorFn: (row): string => row.hostName ?? '',
		width: { min: 290 },
		enableSort: false,
		enableRemove: false,
		enableMove: false,
		pin: 'left',
		visibilityBehavior: 'hidden-on-expand',
		cell: ({ value }): React.ReactNode => (
			<HostnameCell hostName={value as string} />
		),
	},
	{
		id: 'active',
		header: (): React.ReactNode => <HostStatusHeader />,
		accessorFn: (row): boolean => row.active,
		width: { min: 150, default: 150 },
		enableSort: false,
		cell: ({ value }): React.ReactNode => {
			const active = value as boolean;
			return <HostStatusBadge active={active} />;
		},
	},
	{
		id: 'cpu',
		header: (): React.ReactNode => <CpuUsageHeader />,
		accessorFn: (row): number => row.cpu,
		width: { min: 220 },
		enableSort: true,
		cell: ({ value }): React.ReactNode => {
			const cpu = value as number;
			return (
				<div className={styles.progressContainer}>
					<ValidateColumnValueWrapper
						value={cpu}
						entity={InfraMonitoringEntity.HOSTS}
						attribute="CPU metric"
					>
						<EntityProgressBar value={cpu} type="cpu" />
					</ValidateColumnValueWrapper>
				</div>
			);
		},
	},
	{
		id: 'memory',
		header: (): React.ReactNode => <MemoryUsageHeader />,
		accessorFn: (row): number => row.memory,
		width: { min: 220 },
		enableSort: true,
		cell: ({ value }): React.ReactNode => {
			const memory = value as number;
			return (
				<div className={styles.progressContainer}>
					<ValidateColumnValueWrapper
						value={memory}
						entity={InfraMonitoringEntity.HOSTS}
						attribute="memory metric"
					>
						<EntityProgressBar value={memory} type="memory" />
					</ValidateColumnValueWrapper>
				</div>
			);
		},
	},
	{
		id: 'wait',
		header: (): React.ReactNode => <IoWaitHeader />,
		accessorFn: (row): number => row.wait,
		width: { min: 100, default: 100 },
		enableSort: true,
		cell: ({ value }): React.ReactNode => {
			const wait = value as number;

			return (
				<ValidateColumnValueWrapper
					value={wait}
					entity={InfraMonitoringEntity.HOSTS}
					attribute="IOWait metric"
				>
					<TanStackTable.Text>{`${Number((wait * 100).toFixed(1))}%`}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
	{
		id: 'load15',
		header: (): React.ReactNode => <LoadAverageHeader />,
		accessorFn: (row): number => row.load15,
		width: { min: 100, default: 100 },
		enableSort: true,
		cell: ({ value }): React.ReactNode => {
			const load15 = value as number;

			return (
				<ValidateColumnValueWrapper
					value={load15}
					entity={InfraMonitoringEntity.HOSTS}
					attribute="load average metric"
				>
					<TanStackTable.Text>{load15}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
];
