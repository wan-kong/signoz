import { ArrowUpDown } from '@signozhq/icons';
import { Tooltip } from 'antd';
import TanStackTable, { TableColumnDef } from 'components/TanStackTableView';

import EntityGroupHeader from '../Base/EntityGroupHeader';
import K8sGroupCell from '../Base/K8sGroupCell';
import { formatBytes } from '../commonUtils';
import {
	ExpandButtonWrapper,
	EntityProgressBar,
	ValidateColumnValueWrapper,
} from '../components';
import { InfraMonitoringEntity } from '../constants';
import { K8sStatefulSetsData } from './api';

export function getK8sStatefulSetRowKey(
	statefulSet: K8sStatefulSetsData,
): string {
	return (
		statefulSet.statefulSetName || statefulSet.meta.k8s_statefulset_name || ''
	);
}

export function getK8sStatefulSetItemKey(
	statefulSet: K8sStatefulSetsData,
): string {
	return statefulSet.meta.k8s_statefulset_name;
}

export const k8sStatefulSetsColumnsConfig: TableColumnDef<K8sStatefulSetsData>[] =
	[
		{
			id: 'statefulSetGroup',
			header: (): React.ReactNode => (
				<EntityGroupHeader title="display.statefulset_group_uppercase" />
			),
			accessorFn: (row): string => row.meta.k8s_statefulset_name || '',
			width: { min: 210 },
			enableSort: false,
			enableRemove: false,
			enableMove: false,
			pin: 'left',
			visibilityBehavior: 'hidden-on-collapse',
			cell: ({ isExpanded, toggleExpanded, row }): JSX.Element | null => {
				return (
					<ExpandButtonWrapper
						isExpanded={isExpanded}
						toggleExpanded={toggleExpanded}
					>
						<K8sGroupCell row={row} />
					</ExpandButtonWrapper>
				);
			},
		},
		{
			id: 'statefulsetName',
			header: (): React.ReactNode => (
				<EntityGroupHeader
					title="display.statefulset_name"
					icon={<ArrowUpDown data-hide-expanded="true" size={14} />}
				/>
			),
			accessorFn: (row): string => row.meta.k8s_statefulset_name || '',
			width: { min: 200 },
			enableSort: false,
			enableRemove: false,
			enableMove: false,
			pin: 'left',
			visibilityBehavior: 'hidden-on-expand',
			cell: ({ value }): React.ReactNode => {
				const statefulsetName = value as string;
				return (
					<Tooltip title={statefulsetName}>
						<TanStackTable.Text>{statefulsetName}</TanStackTable.Text>
					</Tooltip>
				);
			},
		},
		{
			id: 'namespaceName',
			header: 'display.namespace_name',
			accessorFn: (row): string => row.meta.k8s_namespace_name || '',
			width: { default: 150 },
			enableSort: false,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const namespaceName = value as string;
				return (
					<Tooltip title={namespaceName}>
						<TanStackTable.Text>{namespaceName}</TanStackTable.Text>
					</Tooltip>
				);
			},
		},
		{
			id: 'available_pods',
			header: 'display.available',
			accessorFn: (row): number => row.availablePods,
			width: { min: 100, default: 140 },
			enableSort: true,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const availablePods = value as number;
				return (
					<ValidateColumnValueWrapper
						value={availablePods}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="available pod"
					>
						<TanStackTable.Text>{availablePods}</TanStackTable.Text>
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'desired_pods',
			header: 'display.desired',
			accessorFn: (row): number => row.desiredPods,
			width: { min: 100, default: 140 },
			enableSort: true,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const desiredPods = value as number;
				return (
					<ValidateColumnValueWrapper
						value={desiredPods}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="desired pod"
					>
						<TanStackTable.Text>{desiredPods}</TanStackTable.Text>
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'cpu_request',
			header: 'display.cpu_req_usage_percent',
			accessorFn: (row): number => row.cpuRequest,
			width: { min: 200, default: 200 },
			enableSort: true,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const cpuRequest = value as number;
				return (
					<ValidateColumnValueWrapper
						value={cpuRequest}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="CPU Request"
					>
						<EntityProgressBar value={cpuRequest} type="request" />
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'cpu_limit',
			header: 'display.cpu_limit_usage_percent',
			accessorFn: (row): number => row.cpuLimit,
			width: { min: 200, default: 200 },
			enableSort: true,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const cpuLimit = value as number;
				return (
					<ValidateColumnValueWrapper
						value={cpuLimit}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="CPU Limit"
					>
						<EntityProgressBar value={cpuLimit} type="limit" />
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'cpu',
			header: 'display.cpu_usage_cores',
			accessorFn: (row): number => row.cpuUsage,
			width: { min: 190 },
			enableSort: true,
			enableResize: true,
			defaultVisibility: false,
			cell: ({ value }): React.ReactNode => {
				const cpu = value as number;
				return (
					<ValidateColumnValueWrapper
						value={cpu}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="CPU metric"
					>
						<TanStackTable.Text>{cpu}</TanStackTable.Text>
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'memory_request',
			header: 'display.mem_req_usage_percent',
			accessorFn: (row): number => row.memoryRequest,
			width: { min: 190 },
			enableSort: true,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const memoryRequest = value as number;
				return (
					<ValidateColumnValueWrapper
						value={memoryRequest}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="Memory Request"
					>
						<EntityProgressBar value={memoryRequest} type="request" />
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'memory_limit',
			header: 'display.mem_limit_usage_percent',
			accessorFn: (row): number => row.memoryLimit,
			width: { min: 180 },
			enableSort: true,
			enableResize: true,
			cell: ({ value }): React.ReactNode => {
				const memoryLimit = value as number;
				return (
					<ValidateColumnValueWrapper
						value={memoryLimit}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="Memory Limit"
					>
						<EntityProgressBar value={memoryLimit} type="limit" />
					</ValidateColumnValueWrapper>
				);
			},
		},
		{
			id: 'memory',
			header: 'display.mem_usage_wss',
			accessorFn: (row): number => row.memoryUsage,
			width: { min: 160 },
			enableSort: true,
			enableResize: true,
			defaultVisibility: false,
			cell: ({ value }): React.ReactNode => {
				const memory = value as number;
				return (
					<ValidateColumnValueWrapper
						value={memory}
						entity={InfraMonitoringEntity.STATEFULSETS}
						attribute="memory metric"
					>
						<TanStackTable.Text>{formatBytes(memory)}</TanStackTable.Text>
					</ValidateColumnValueWrapper>
				);
			},
		},
	];
