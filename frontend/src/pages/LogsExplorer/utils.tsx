import {
	FiltersType,
	IQuickFiltersConfig,
} from 'components/QuickFilters/types';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';
import { Query } from 'types/api/queryBuilder/queryBuilderData';

export const prepareQueryWithDefaultTimestamp = (query: Query): Query => ({
	...query,
	builder: {
		...query.builder,
		queryData: query.builder.queryData?.map((item) => ({
			...item,
			orderBy: [{ columnName: 'timestamp', order: 'desc' }],
		})),
	},
});

export enum ExplorerViews {
	LIST = 'list',
	TIMESERIES = 'timeseries',
	TRACE = 'trace',
	TABLE = 'table',
	CLICKHOUSE = 'clickhouse',
}

export const LogsQuickFiltersConfig: IQuickFiltersConfig[] = [
	{
		type: FiltersType.CHECKBOX,
		title: 'severity_text',
		titleKey: 'quick_filters.titles.severity_text',
		attributeKey: {
			key: 'severity_text',
			dataType: DataTypes.String,
			type: '',
			id: 'severity_text--string----true',
		},
		defaultOpen: true,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'deployment.environment',
		titleKey: 'quick_filters.titles.environment',
		attributeKey: {
			key: 'deployment.environment',
			dataType: DataTypes.String,
			type: 'resource',
		},
		defaultOpen: false,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'service.name',
		titleKey: 'quick_filters.titles.service_name',
		attributeKey: {
			key: 'service.name',
			dataType: DataTypes.String,
			type: 'resource',
			id: 'service.name--string--resource--true',
		},
		defaultOpen: false,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'host.name',
		titleKey: 'quick_filters.titles.hostname',
		attributeKey: {
			key: 'host.name',
			dataType: DataTypes.String,
			type: 'resource',
		},
		defaultOpen: false,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'k8s.cluster.name',
		titleKey: 'quick_filters.titles.k8s_cluster_name',
		attributeKey: {
			key: 'k8s.cluster.name',
			dataType: DataTypes.String,
			type: 'resource',
		},
		defaultOpen: false,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'k8s.deployment.name',
		titleKey: 'quick_filters.titles.k8s_deployment_name',
		attributeKey: {
			key: 'k8s.deployment.name',
			dataType: DataTypes.String,
			type: 'resource',
		},
		defaultOpen: false,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'k8s.namespace.name',
		titleKey: 'quick_filters.titles.k8s_namespace_name',
		attributeKey: {
			key: 'k8s.namespace.name',
			dataType: DataTypes.String,
			type: 'resource',
		},
		defaultOpen: false,
	},
	{
		type: FiltersType.CHECKBOX,
		title: 'k8s.pod.name',
		titleKey: 'quick_filters.titles.k8s_pod_name',
		attributeKey: {
			key: 'k8s.pod.name',
			dataType: DataTypes.String,
			type: 'resource',
		},
		defaultOpen: false,
	},
];
