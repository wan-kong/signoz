import React from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

const INFRA_DISPLAY_KEYS: Record<string, string> = {
	'(15min)': 'display.load_avg_15_min_suffix',
	'(cores)': 'display.cores_suffix',
	'(WSS)': 'display.wss_suffix',
	'*** End ***': 'display.end_marker',
	Active: 'display.active',
	ACTIVE: 'display.active_uppercase',
	'Active Pods': 'display.active_pods',
	'Added Columns (Click to remove)': 'display.added_columns_click_to_remove',
	Age: 'display.age',
	All: 'display.all',
	Allocatable: 'display.allocatable',
	'An error occurred while fetching data.':
		'display.error_occurred_while_fetching_data',
	Available: 'display.available',
	'Available Pods': 'display.available_pods',
	'Aw snap :/': 'display.aw_snap',
	Body: 'display.body',
	Capacity: 'display.capacity',
	Cluster: 'display.cluster',
	'Cluster Group': 'display.cluster_group',
	'Cluster Name': 'display.cluster_name',
	Clusters: 'display.clusters',
	'Click to add more columns to this table':
		'display.click_to_add_more_columns_to_this_table',
	'Collapse Filters': 'display.collapse_filters',
	Columns: 'display.columns',
	Completed: 'display.completed',
	Completions: 'display.completions',
	'Contact Support': 'display.contact_support',
	'CPU Alloc (cores)': 'display.cpu_alloc_cores',
	'CPU Allocatable': 'display.cpu_allocatable',
	'CPU Limit': 'display.cpu_limit',
	'CPU Limit Usage (%)': 'display.cpu_limit_usage_percent',
	'CPU Limit Utilization By Pod Name':
		'display.cpu_limit_utilization_by_pod_name',
	'CPU Req Usage (%)': 'display.cpu_req_usage_percent',
	'CPU Request': 'display.cpu_request',
	'CPU Request Utilization By Pod Name':
		'display.cpu_request_utilization_by_pod_name',
	'CPU request, limit util (%)': 'display.cpu_request_limit_util_percent',
	'CPU Request, Limit Utilization': 'display.cpu_request_limit_utilization',
	'CPU Request, Limit Utilization by Container':
		'display.cpu_request_limit_utilization_by_container',
	'CPU usage': 'display.cpu_usage_lower',
	'CPU Usage': 'display.cpu_usage',
	'CPU USAGE': 'display.cpu_usage_uppercase',
	'CPU Usage (%)': 'display.cpu_usage_percent',
	'CPU Usage (cores)': 'display.cpu_usage_cores',
	'CPU Usage by Container (cores)': 'display.cpu_usage_by_container_cores',
	'CPU Usage, allocatable': 'display.cpu_usage_allocatable',
	'CPU usage, request, limits': 'display.cpu_usage_request_limits',
	Current: 'display.current',
	'Current Nodes': 'display.current_nodes',
	'Current Pods': 'display.current_pods',
	'Copied to clipboard': 'display.copied_to_clipboard',
	'Copy value': 'display.copy_value',
	DaemonSet: 'display.daemonset',
	'DaemonSet Group': 'display.daemonset_group',
	'DAEMONSET GROUP': 'display.daemonset_group_uppercase',
	'DaemonSet Name': 'display.daemonset_name',
	'Daemonset Name': 'display.daemonset_name',
	'Daemonset nodes': 'display.daemonset_nodes',
	DaemonSets: 'display.daemonsets',
	'DaemonSets (nodes)': 'display.daemonsets_nodes',
	Deployment: 'display.deployment',
	'Deployment Group': 'display.deployment_group',
	'DEPLOYMENT GROUP': 'display.deployment_group_uppercase',
	'Deployment Name': 'display.deployment_name',
	Deployments: 'display.deployments',
	'Deployments (pods)': 'display.deployments_pods',
	'Deployments available and desired':
		'display.deployments_available_and_desired',
	Desired: 'display.desired',
	'Desired Nodes': 'display.desired_nodes',
	'Desired Pods': 'display.desired_pods',
	'Desired Successful': 'display.desired_successful',
	'Desired Successful Pods': 'display.desired_successful_pods',
	'Decrease line height': 'display.decrease_line_height',
	'Disk Usage': 'display.disk_usage',
	Duration: 'display.duration',
	'Edit your query and try again!': 'display.edit_your_query_and_try_again',
	Environment: 'display.environment',
	'Error Status': 'display.error_status',
	Events: 'display.events',
	'Excluding cache memory': 'display.excluding_cache_memory',
	'Excluding cache memory.': 'display.excluding_cache_memory_period',
	Failed: 'display.failed',
	'Failed Pods': 'display.failed_pods',
	'Failed to load entity details': 'display.failed_to_load_entity_details',
	'File system (bytes)': 'display.file_system_bytes',
	'Filesystem usage (%)': 'display.filesystem_usage_percent',
	'Filesystem usage (bytes)': 'display.filesystem_usage_bytes',
	'FileSystem Usage Percentage By Pod Name':
		'display.filesystem_usage_percentage_by_pod_name',
	'Filter by': 'display.filter_by',
	Filters: 'display.filters',
	'Go to Logs Explorer': 'display.go_to_logs_explorer',
	'Go to Traces Explorer': 'display.go_to_traces_explorer',
	'Group by': 'display.group_by',
	'Host Name': 'display.host_name',
	'Host Group': 'display.host_group',
	'HOST GROUP': 'display.host_group_uppercase',
	Hostname: 'display.hostname',
	Hosts: 'display.hosts',
	'HTTP Method': 'display.http_method',
	Inactive: 'display.inactive',
	INACTIVE: 'display.inactive_uppercase',
	Inodes: 'display.inodes',
	'Inodes Free': 'display.inodes_free',
	'Inodes Used': 'display.inodes_used',
	'Instrumentation checks': 'display.instrumentation_checks',
	'Increase line height': 'display.increase_line_height',
	IOWait: 'display.io_wait',
	Job: 'display.job',
	'Job Group': 'display.job_group',
	'JOB GROUP': 'display.job_group_uppercase',
	'Job Name': 'display.job_name',
	Jobs: 'display.jobs',
	Key: 'display.key',
	Kubernetes: 'display.kubernetes',
	'Learn here': 'display.learn_here',
	'Learn how to configure': 'display.learn_how_to_configure',
	'Learn how to configure →': 'display.learn_how_to_configure_arrow',
	'Learn more.': 'display.learn_more_period',
	'Load Avg': 'display.load_avg',
	'Loading...': 'display.loading',
	'Loading more logs ...': 'display.loading_more_logs',
	Logs: 'display.logs',
	'Mem Limit Usage (%)': 'display.mem_limit_usage_percent',
	'Mem Req Usage (%)': 'display.mem_req_usage_percent',
	'Mem Usage (WSS)': 'display.mem_usage_wss',
	Memory: 'display.memory',
	'Memory Allocatable': 'display.memory_allocatable',
	'Memory by State': 'display.memory_by_state',
	'Memory Limit': 'display.memory_limit',
	'Memory Limit Utilization By Pod Name':
		'display.memory_limit_utilization_by_pod_name',
	'Memory Major Page Faults': 'display.memory_major_page_faults',
	'Memory Request': 'display.memory_request',
	'Memory Request Utilization By Pod Name':
		'display.memory_request_utilization_by_pod_name',
	'Memory request, limit util (%)': 'display.memory_request_limit_util_percent',
	'Memory Request, Limit Utilization':
		'display.memory_request_limit_utilization',
	'Memory Request, Limit Utilization by Container':
		'display.memory_request_limit_utilization_by_container',
	'Memory Usage': 'display.memory_usage',
	'MEMORY USAGE': 'display.memory_usage_uppercase',
	'Memory Usage (%)': 'display.memory_usage_percent',
	'Memory Usage (bytes)': 'display.memory_usage_bytes',
	'Memory Usage (WSS)': 'display.memory_usage_wss',
	'Memory Usage by Container (bytes)': 'display.memory_usage_by_container_bytes',
	'Memory Usage, allocatable': 'display.memory_usage_allocatable',
	'Memory usage, request, limits': 'display.memory_usage_request_limits',
	Metrics: 'display.metrics',
	Misscheduled: 'display.misscheduled',
	'Misscheduled Nodes': 'display.misscheduled_nodes',
	'Missing host.name metadata.': 'display.missing_host_name_metadata',
	Name: 'display.name',
	'N/A': 'display.not_available_abbrev',
	Namespace: 'display.namespace',
	'Namespace Group': 'display.namespace_group',
	'NAMESPACE GROUP': 'display.namespace_group_uppercase',
	NAMESPACE: 'display.namespace_uppercase',
	'Namespace Name': 'display.namespace_name',
	Namespaces: 'display.namespaces',
	'Network error count': 'display.network_error_count',
	'Network errors': 'display.network_errors',
	'Network errors count': 'display.network_errors_count',
	'Network IO': 'display.network_io',
	'Network IO rate': 'display.network_io_rate',
	'Network rate': 'display.network_rate',
	'No data': 'display.no_data',
	'No data yet.': 'display.no_data_yet',
	'No errors': 'display.no_errors',
	'No host metrics data received yet':
		'display.no_host_metrics_data_received_yet',
	'No Kubernetes events received yet.':
		'display.no_kubernetes_events_received_yet',
	Node: 'display.node',
	'Node Group': 'display.node_group',
	'NODE GROUP': 'display.node_group_uppercase',
	'Node Name': 'display.node_name',
	'Node Readiness': 'display.node_readiness',
	Nodes: 'display.nodes',
	'Not Ready': 'display.not_ready',
	'NotReady Nodes': 'display.not_ready_nodes',
	'Not sure what this means?': 'display.not_sure_what_this_means',
	'Not sure what this represents?': 'display.not_sure_what_this_represents',
	'Open in Metrics Explorer': 'display.open_in_metrics_explorer',
	'OPERATING SYSTEM': 'display.operating_system_uppercase',
	'OS Type': 'display.os_type',
	'Other Columns (Click to add)': 'display.other_columns_click_to_add',
	'Our team is getting on top to resolve this. Please reach out to support if the issue persists.':
		'display.team_resolving_reach_support',
	'our documentation': 'display.our_documentation',
	Pending: 'display.pending',
	Pod: 'display.pod',
	'Pod Group': 'display.pod_group',
	'POD GROUP': 'display.pod_group_uppercase',
	'Pod Metrics': 'display.pod_metrics',
	'Pod Name': 'display.pod_name',
	'Pod Replicas': 'display.pod_replicas',
	'Pod Status': 'display.pod_status',
	Pods: 'display.pods',
	'Pods by CPU (top 10)': 'display.pods_by_cpu_top_10',
	'Pods by Memory (top 10)': 'display.pods_by_memory_top_10',
	'Pods CPU (top 10)': 'display.pods_cpu_top_10',
	'Pods Memory (top 10)': 'display.pods_memory_top_10',
	'PVC Name': 'display.pvc_name',
	'PVC Volume Claim Name': 'display.pvc_volume_claim_name',
	'Please refer to': 'display.please_refer_to',
	Ready: 'display.ready',
	'Ready Nodes': 'display.ready_nodes',
	Recheck: 'display.recheck',
	ReplicaSets: 'display.replicasets',
	'ReplicaSets (pods)': 'display.replicasets_pods',
	Reset: 'display.reset',
	'Reset to list time': 'display.reset_to_list_time',
	Restarts: 'display.restarts',
	Running: 'display.running',
	'Scheduled Nodes': 'display.scheduled_nodes',
	'Search for attribute': 'display.search_for_attribute',
	'Sent system metrics in last 10 mins':
		'display.sent_system_metrics_in_last_10_mins',
	'Sent system metrics in last 10 mins.':
		'display.sent_system_metrics_in_last_10_mins_period',
	'Service Name': 'display.service_name',
	Severity: 'display.severity',
	'Span ID': 'display.span_id',
	'Something went wrong': 'display.something_went_wrong',
	'Something went wrong. Please try again or contact support.':
		'display.something_went_wrong_try_again_contact_support',
	Statefulset: 'display.statefulset',
	'StatefulSet Group': 'display.statefulset_group',
	'STATEFULSET GROUP': 'display.statefulset_group_uppercase',
	'Statefulset Name': 'display.statefulset_name',
	'StatefulSet Name': 'display.statefulset_name',
	'Statefulset pods': 'display.statefulset_pods',
	StatefulSets: 'display.statefulsets',
	'StatefulSets (pods)': 'display.statefulsets_pods',
	Status: 'display.status',
	STATUS: 'display.status_uppercase',
	'Status Code': 'display.status_code',
	Successful: 'display.successful',
	'Successful Pods': 'display.successful_pods',
	'This query had no results.': 'display.this_query_had_no_results',
	'This query had no results. Edit your query and try again!':
		'display.this_query_had_no_results_edit',
	Timestamp: 'display.timestamp',
	'to learn how to send host metrics.':
		'display.to_learn_how_to_send_host_metrics',
	'To view events, enable the k8s events receiver in your OpenTelemetry Collector.':
		'display.enable_k8s_events_receiver',
	'To see K8s metrics, upgrade to the latest version of SigNoz k8s-infra chart. Please contact support if you need help.':
		'display.upgrade_k8s_infra_chart',
	Traces: 'display.traces',
	'Trace ID': 'display.trace_id',
	'Queried time range is before earliest K8s metrics':
		'display.queried_time_range_before_earliest_k8s_metrics',
	Unknown: 'display.unknown',
	UNKNOWN: 'display.unknown_uppercase',
	'Usage (%)': 'display.usage_percent',
	Used: 'display.used',
	Value: 'display.value',
	'View All': 'display.view_all',
	'Viewing · Resource': 'display.viewing_resource',
	'Volume Group': 'display.volume_group',
	'VOLUME GROUP': 'display.volume_group_uppercase',
	'Volume available': 'display.volume_available',
	'Volume capacity': 'display.volume_capacity',
	'Volume inodes': 'display.volume_inodes',
	'Volume inodes free': 'display.volume_inodes_free',
	'Volume inodes used': 'display.volume_inodes_used',
	Volumes: 'display.volumes',
	'When we receive data, it will show up here.': 'display.when_we_receive_data',
	'Your requested end time is earlier than the earliest detected time of K8s metrics data, please adjust your end time.':
		'display.requested_end_time_before_earliest_k8s_metrics',
	'Your data contains some warnings': 'display.data_contains_warnings',
};

const normalize = (value: string): string => value.replace(/\s+/g, ' ').trim();

export function translateInfraKey(
	t: TFunction,
	key: string | undefined,
	fallback: string,
): string {
	if (!key) {
		return fallback;
	}

	const translated = t(key, { defaultValue: fallback });
	return translated === key || translated.endsWith(`:${key}`)
		? fallback
		: translated;
}

export function translateInfraText(t: TFunction, value: string): string {
	const normalized = normalize(value);
	const key = INFRA_DISPLAY_KEYS[normalized];
	if (!key) {
		return value;
	}

	return translateInfraKey(t, key, value);
}

export function translateInfraNode(
	t: TFunction,
	node: React.ReactNode,
): React.ReactNode {
	return React.Children.map(node, (child) => {
		if (typeof child === 'string') {
			const leading = child.match(/^\s*/)?.[0] ?? '';
			const trailing = child.match(/\s*$/)?.[0] ?? '';
			const normalized = normalize(child);
			return normalized
				? `${leading}${translateInfraText(t, normalized)}${trailing}`
				: child;
		}

		if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
			return React.cloneElement(child, {
				children: translateInfraNode(t, child.props.children),
			});
		}

		return child;
	});
}

export function InfraText({ value }: { value: string }): JSX.Element {
	const { t } = useTranslation('infraMonitoring');
	return <>{translateInfraText(t, value)}</>;
}

export function InfraTrans({
	i18nKey,
	fallback,
}: {
	i18nKey?: string;
	fallback: string;
}): JSX.Element {
	const { t } = useTranslation('infraMonitoring');
	return <>{translateInfraKey(t, i18nKey, fallback)}</>;
}
