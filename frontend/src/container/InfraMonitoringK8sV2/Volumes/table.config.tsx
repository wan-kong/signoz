import TanStackTable, { TableColumnDef } from 'components/TanStackTableView';
import i18n from 'ReactI18';
import { InframonitoringtypesVolumeRecordDTO } from 'api/generated/services/sigNoz.schemas';
import { ExpandButtonWrapper } from 'container/InfraMonitoringK8sV2/components';

import ColumnHeader from '../Base/ColumnHeader';
import EntityGroupHeader from '../Base/EntityGroupHeader';
import K8sGroupCell from '../Base/K8sGroupCell';
import { formatBytes } from '../commonUtils';
import { ValidateColumnValueWrapper } from '../components';
import {
	INFRA_MONITORING_ATTR_KEYS,
	InfraMonitoringEntity,
} from '../constants';
import { SelectedItemParams } from '../hooks';
import { HardDrive } from '@signozhq/icons';

export function getK8sVolumeRowKey(
	volume: InframonitoringtypesVolumeRecordDTO,
): string {
	return (
		volume.persistentVolumeClaimName ||
		volume.meta?.[INFRA_MONITORING_ATTR_KEYS.K8S_PERSISTENT_VOLUME_CLAIM_NAME] ||
		''
	);
}

export function getK8sVolumeItemKey(
	volume: InframonitoringtypesVolumeRecordDTO,
): SelectedItemParams {
	return {
		selectedItem:
			volume.persistentVolumeClaimName ??
			volume.meta?.[INFRA_MONITORING_ATTR_KEYS.K8S_PERSISTENT_VOLUME_CLAIM_NAME] ??
			null,
		clusterName:
			volume.meta?.[INFRA_MONITORING_ATTR_KEYS.K8S_CLUSTER_NAME] ?? null,
		namespaceName:
			volume.meta?.[INFRA_MONITORING_ATTR_KEYS.K8S_NAMESPACE_NAME] ?? null,
	};
}

export type VolumeTableColumnConfig =
	TableColumnDef<InframonitoringtypesVolumeRecordDTO>;
export const k8sVolumesColumnsConfig: VolumeTableColumnConfig[] = [
	{
		id: 'volumeGroup',
		header: (): React.ReactNode => (
			<EntityGroupHeader
				title={i18n.t('display.volume_group', 'Volume Group', {
					ns: 'infraMonitoring',
				})}
				titleKey="display.volume_group"
			/>
		),
		accessorFn: (row): string => row.persistentVolumeClaimName || '',
		width: { min: 290 },
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
		id: 'pvcName',
		header: (): React.ReactNode => (
			<EntityGroupHeader
				title={i18n.t('volumes_table.pvc_name', 'PVC Name', {
					ns: 'infraMonitoring',
				})}
				titleKey="volumes_table.pvc_name"
				icon={<HardDrive data-hide-expanded="true" size={14} />}
				docPath="/infrastructure-monitoring/kubernetes/volumes#pvc-name"
			/>
		),
		accessorFn: (row): string => row.persistentVolumeClaimName || '',
		width: { min: 290 },
		enableSort: false,
		enableRemove: false,
		enableMove: false,
		pin: 'left',
		visibilityBehavior: 'hidden-on-expand',
		cell: ({ value }): React.ReactNode => (
			<TanStackTable.Text>{value}</TanStackTable.Text>
		),
	},
	{
		id: 'namespaceName',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#namespace-name"
				title={i18n.t('display.namespace', 'Namespace', { ns: 'infraMonitoring' })}
			/>
		),
		accessorFn: (row): string =>
			row.meta?.[INFRA_MONITORING_ATTR_KEYS.K8S_NAMESPACE_NAME] || '',
		width: { min: 220 },
		enableSort: false,
		cell: ({ value }): React.ReactNode => (
			<TanStackTable.Text>{value}</TanStackTable.Text>
		),
	},
	{
		id: 'capacity',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#volume-capacity"
				title={i18n.t('volumes_table.capacity', 'Capacity', {
					ns: 'infraMonitoring',
				})}
			/>
		),
		accessorFn: (row): number => row.volumeCapacity,
		width: { min: 140 },
		enableSort: true,
		cell: ({ value, rowId }): React.ReactNode => {
			const capacity = value as number;
			return (
				<ValidateColumnValueWrapper
					rowId={rowId}
					value={capacity}
					entity={InfraMonitoringEntity.VOLUMES}
					attribute="capacity metric"
				>
					<TanStackTable.Text>{formatBytes(capacity)}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
	{
		id: 'usage',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#volume-used"
				title={i18n.t('volumes_table.used', 'Used', { ns: 'infraMonitoring' })}
			/>
		),
		accessorFn: (row): number => row.volumeUsage,
		width: { min: 140 },
		enableSort: true,
		cell: ({ value, rowId }): React.ReactNode => {
			const usage = value as number;
			return (
				<ValidateColumnValueWrapper
					rowId={rowId}
					value={usage}
					entity={InfraMonitoringEntity.VOLUMES}
					attribute="utilization metric"
				>
					<TanStackTable.Text>{formatBytes(usage)}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
	{
		id: 'available',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#volume-available"
				title={i18n.t('volumes_table.available', 'Available', {
					ns: 'infraMonitoring',
				})}
			/>
		),
		accessorFn: (row): number => row.volumeAvailable,
		width: { min: 140 },
		enableSort: true,
		cell: ({ value, rowId }): React.ReactNode => {
			const available = value as number;
			return (
				<ValidateColumnValueWrapper
					rowId={rowId}
					value={available}
					entity={InfraMonitoringEntity.VOLUMES}
					attribute="available metric"
				>
					<TanStackTable.Text>{formatBytes(available)}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
	{
		id: 'inodes',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#volume-inodes"
				title={i18n.t('volumes_table.inodes', 'Inodes', { ns: 'infraMonitoring' })}
			/>
		),
		accessorFn: (row): number => row.volumeInodes,
		width: { min: 140 },
		enableSort: true,
		cell: ({ value, rowId }): React.ReactNode => {
			const inodes = value as number;
			return (
				<ValidateColumnValueWrapper
					rowId={rowId}
					value={inodes}
					entity={InfraMonitoringEntity.VOLUMES}
					attribute="inodes metric"
				>
					<TanStackTable.Text>{inodes}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
	{
		id: 'inodesUsed',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#volume-inodes-used"
				title={i18n.t('volumes_table.inodes_used', 'Inodes Used', {
					ns: 'infraMonitoring',
				})}
			/>
		),
		accessorFn: (row): number => row.volumeInodesUsed,
		width: { min: 160 },
		enableSort: true,
		cell: ({ value, rowId }): React.ReactNode => {
			const inodesUsed = value as number;
			return (
				<ValidateColumnValueWrapper
					rowId={rowId}
					value={inodesUsed}
					entity={InfraMonitoringEntity.VOLUMES}
					attribute="inodes used metric"
				>
					<TanStackTable.Text>{inodesUsed}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
	{
		id: 'inodesFree',
		header: (): React.ReactNode => (
			<ColumnHeader
				docPath="/infrastructure-monitoring/kubernetes/volumes#volume-inodes-free"
				title={i18n.t('volumes_table.inodes_free', 'Inodes Free', {
					ns: 'infraMonitoring',
				})}
			/>
		),
		accessorFn: (row): number => row.volumeInodesFree,
		width: { min: 160 },
		enableSort: true,
		cell: ({ value, rowId }): React.ReactNode => {
			const inodesFree = value as number;
			return (
				<ValidateColumnValueWrapper
					rowId={rowId}
					value={inodesFree}
					entity={InfraMonitoringEntity.VOLUMES}
					attribute="inodes free metric"
				>
					<TanStackTable.Text>{inodesFree}</TanStackTable.Text>
				</ValidateColumnValueWrapper>
			);
		},
	},
];
