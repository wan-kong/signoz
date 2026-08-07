import i18n from 'ReactI18';
// oxlint-disable import/no-cycle
import { FiltersType } from 'components/QuickFilters/types';
import type { IQuickFiltersConfig } from 'components/QuickFilters/types';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';
import { DataSource } from 'types/common/queryBuilder';

export const DEFAULT_PAGE_SIZE = 10;

export enum InfraMonitoringEntity {
	HOSTS = 'hosts',
	PODS = 'pods',
	NODES = 'nodes',
	NAMESPACES = 'namespaces',
	CLUSTERS = 'clusters',
	DEPLOYMENTS = 'deployments',
	STATEFULSETS = 'statefulsets',
	DAEMONSETS = 'daemonsets',
	CONTAINERS = 'containers',
	JOBS = 'jobs',
	VOLUMES = 'volumes',
}

export enum VIEWS {
	METRICS = 'metrics',
	LOGS = 'logs',
	TRACES = 'traces',
	CONTAINERS = 'containers',
	PROCESSES = 'processes',
	EVENTS = 'events',
}

export const VIEW_TYPES = {
	METRICS: VIEWS.METRICS,
	LOGS: VIEWS.LOGS,
	TRACES: VIEWS.TRACES,
	EVENTS: VIEWS.EVENTS,
};

export const K8sCategories = {
	HOSTS: 'hosts',
	PODS: 'pods',
	NODES: 'nodes',
	NAMESPACES: 'namespaces',
	CLUSTERS: 'clusters',
	DEPLOYMENTS: 'deployments',
	STATEFULSETS: 'statefulsets',
	DAEMONSETS: 'daemonsets',
	CONTAINERS: 'containers',
	JOBS: 'jobs',
	VOLUMES: 'volumes',
};

export const underscoreMap = {
	[InfraMonitoringEntity.HOSTS]: 'system_cpu_load_average_15m',
	[InfraMonitoringEntity.PODS]: 'k8s_pod_cpu_usage',
	[InfraMonitoringEntity.NODES]: 'k8s_node_cpu_usage',
	[InfraMonitoringEntity.NAMESPACES]: 'k8s_pod_cpu_usage',
	[InfraMonitoringEntity.CLUSTERS]: 'k8s_node_cpu_usage',
	[InfraMonitoringEntity.DEPLOYMENTS]: 'k8s_pod_cpu_usage',
	[InfraMonitoringEntity.STATEFULSETS]: 'k8s_pod_cpu_usage',
	[InfraMonitoringEntity.DAEMONSETS]: 'k8s_pod_cpu_usage',
	[InfraMonitoringEntity.CONTAINERS]: 'k8s_pod_cpu_usage',
	[InfraMonitoringEntity.JOBS]: 'k8s_job_desired_successful_pods',
	[InfraMonitoringEntity.VOLUMES]: 'k8s_volume_capacity',
};

export const dotMap = {
	[InfraMonitoringEntity.HOSTS]: 'system.cpu.load_average.15m',
	[InfraMonitoringEntity.PODS]: 'k8s.pod.cpu.usage',
	[InfraMonitoringEntity.NODES]: 'k8s.node.cpu.usage',
	[InfraMonitoringEntity.NAMESPACES]: 'k8s.pod.cpu.usage',
	[InfraMonitoringEntity.CLUSTERS]: 'k8s.node.cpu.usage',
	[InfraMonitoringEntity.DEPLOYMENTS]: 'k8s.pod.cpu.usage',
	[InfraMonitoringEntity.STATEFULSETS]: 'k8s.pod.cpu.usage',
	[InfraMonitoringEntity.DAEMONSETS]: 'k8s.pod.cpu.usage',
	[InfraMonitoringEntity.CONTAINERS]: 'k8s.pod.cpu.usage',
	[InfraMonitoringEntity.JOBS]: 'k8s.job.desired_successful_pods',
	[InfraMonitoringEntity.VOLUMES]: 'k8s.volume.capacity',
};

export function GetK8sEntityToAggregateAttribute(
	category: InfraMonitoringEntity,
	dotMetricsEnabled: boolean,
): string {
	return dotMetricsEnabled ? dotMap[category] : underscoreMap[category];
}

export function GetPodsQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const podKey = dotMetricsEnabled ? 'k8s.pod.name' : 'k8s_pod_name';
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const nodeKey = dotMetricsEnabled ? 'k8s.node.name' : 'k8s_node_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const deploymentKey = dotMetricsEnabled
		? 'k8s.deployment.name'
		: 'k8s_deployment_name';
	const statefulsetKey = dotMetricsEnabled
		? 'k8s.statefulset.name'
		: 'k8s_statefulset_name';
	const daemonsetKey = dotMetricsEnabled
		? 'k8s.daemonset.name'
		: 'k8s_daemonset_name';
	const jobKey = dotMetricsEnabled ? 'k8s.job.name' : 'k8s_job_name';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	// Define aggregate attribute (metric) name
	const cpuUtilizationMetric = dotMetricsEnabled
		? 'k8s.pod.cpu.usage'
		: 'k8s_pod_cpu_usage';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.pod',
			attributeKey: {
				key: podKey,
				dataType: DataTypes.String,
				type: 'tag',
				id: `${podKey}--string--tag--true`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${namespaceKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.node',
			attributeKey: {
				key: nodeKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${nodeKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.deployment',
			attributeKey: {
				key: deploymentKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${deploymentKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.statefulset',
			attributeKey: {
				key: statefulsetKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${statefulsetKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.daemonset',
			attributeKey: {
				key: daemonsetKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${daemonsetKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.job',
			attributeKey: {
				key: jobKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${jobKey}--string--resource--false`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilizationMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: false,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetNodesQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	// Define attribute keys
	const nodeKey = dotMetricsEnabled ? 'k8s.node.name' : 'k8s_node_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';

	// Define aggregate metric name for node CPU utilization
	const cpuUtilMetric = dotMetricsEnabled
		? 'k8s.node.cpu.usage'
		: 'k8s_node_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.node_name',
			attributeKey: {
				key: nodeKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${nodeKey}--string--resource--true`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource--true`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetNamespaceQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const cpuUtilMetric = dotMetricsEnabled
		? 'k8s.pod.cpu.usage'
		: 'k8s_pod_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace_name',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${namespaceKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetClustersQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const cpuUtilMetric = dotMetricsEnabled
		? 'k8s.node.cpu.usage'
		: 'k8s_node_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: cpuUtilMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetVolumesQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const pvcKey = dotMetricsEnabled
		? 'k8s.persistentvolumeclaim.name'
		: 'k8s_persistentvolumeclaim_name';
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const volumeMetric = dotMetricsEnabled
		? 'k8s.volume.capacity'
		: 'k8s_volume_capacity';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.pvc_volume_claim_name',
			attributeKey: {
				key: pvcKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${pvcKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: volumeMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace_name',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${namespaceKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: volumeMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: volumeMetric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetDeploymentsQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const deployKey = dotMetricsEnabled
		? 'k8s.deployment.name'
		: 'k8s_deployment_name';
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const metric = dotMetricsEnabled ? 'k8s.pod.cpu.usage' : 'k8s_pod_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.deployment_name',
			attributeKey: {
				key: deployKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${deployKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace_name',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${namespaceKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetStatefulsetsQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const ssKey = dotMetricsEnabled
		? 'k8s.statefulset.name'
		: 'k8s_statefulset_name';
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const metric = dotMetricsEnabled ? 'k8s.pod.cpu.usage' : 'k8s_pod_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.statefulset_name',
			attributeKey: {
				key: ssKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${ssKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace_name',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${namespaceKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${clusterKey}--string--resource`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metric,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetDaemonsetsQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const nameKey = dotMetricsEnabled
		? 'k8s.daemonset.name'
		: 'k8s_daemonset_name';
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const metricName = dotMetricsEnabled
		? 'k8s.pod.cpu.usage'
		: 'k8s_pod_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.daemonset_name',
			attributeKey: {
				key: nameKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${nameKey}--string--resource--true`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metricName,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace_name',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metricName,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metricName,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export function GetJobsQuickFiltersConfig(
	dotMetricsEnabled: boolean,
): IQuickFiltersConfig[] {
	const nameKey = dotMetricsEnabled ? 'k8s.job.name' : 'k8s_job_name';
	const namespaceKey = dotMetricsEnabled
		? 'k8s.namespace.name'
		: 'k8s_namespace_name';
	const clusterKey = dotMetricsEnabled ? 'k8s.cluster.name' : 'k8s_cluster_name';
	const metricName = dotMetricsEnabled
		? 'k8s.pod.cpu.usage'
		: 'k8s_pod_cpu_usage';
	const environmentKey = dotMetricsEnabled
		? 'deployment.environment'
		: 'deployment_environment';

	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.job_name',
			attributeKey: {
				key: nameKey,
				dataType: DataTypes.String,
				type: 'resource',
				id: `${nameKey}--string--resource--true`,
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metricName,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.namespace_name',
			attributeKey: {
				key: namespaceKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metricName,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.cluster_name',
			attributeKey: {
				key: clusterKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			aggregateOperator: 'noop',
			aggregateAttribute: metricName,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: environmentKey,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}

export const getInvalidValueTooltipText = (
	entity: InfraMonitoringEntity,
	attribute: string,
): string =>
	i18n.t(
		'entity.no_attribute_tooltip',
		'Some {{entity}} do not have {{attribute}}s.',
		{ entity, attribute, ns: 'infraMonitoring' },
	);

export const INFRA_MONITORING_K8S_PARAMS_KEYS = {
	CATEGORY: 'category',
	VIEW: 'view',
	FILTERS: 'filters',
	GROUP_BY: 'groupBy',
	ORDER_BY: 'orderBy',
	LOG_FILTERS: 'logFilters',
	TRACES_FILTERS: 'tracesFilters',
	EVENTS_FILTERS: 'eventsFilters',
	HOSTS_FILTERS: 'hostsFilters',
	CURRENT_PAGE: 'currentPage',
	PAGE: 'page',
	PAGE_SIZE: 'pageSize',
	EXPANDED: 'expanded',
	SELECTED_ITEM: 'selectedItem',
};
