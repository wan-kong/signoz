import { isEmpty } from 'lodash-es';
import { TelemetryFieldKey } from 'api/v5/v5';
import { IField } from 'types/api/logs/fields';
import {
	IBuilderQuery,
	TagFilterItem,
} from 'types/api/queryBuilder/queryBuilderData';

export const convertKeysToColumnFields = (
	keys: TelemetryFieldKey[],
): IField[] =>
	keys
		.filter((item) => !isEmpty(item.name))
		.map((item) => ({
			dataType: item.fieldDataType ?? '',
			name: item.name,
			type: item.fieldContext ?? '',
		}));
/**
 * Determines if a query represents a trace-to-logs navigation
 * by checking for the presence of a trace_id filter.
 */
export const isTraceToLogsQuery = (queryData: IBuilderQuery): boolean => {
	// Check if this is a trace-to-logs query by looking for trace_id filter
	if (!queryData?.filters?.items) {
		return false;
	}

	const traceIdFilter = queryData.filters.items.find(
		(item: TagFilterItem) => item.key?.key === 'trace_id',
	);

	return !!traceIdFilter;
};

export type EmptyLogsListConfig = {
	title: string;
	subTitle: string;
	description: string | string[];
	documentationLinks?: Array<{
		text: string;
		url: string;
	}>;
	showClearFiltersButton?: boolean;
	onClearFilters?: () => void;
	clearFiltersButtonText?: string;
};

export const getEmptyLogsListConfig = (
	handleClearFilters: () => void,
): EmptyLogsListConfig => ({
	title: 'empty.trace_to_logs.title',
	subTitle: 'empty.trace_to_logs.subtitle',
	description: [
		'empty.trace_to_logs.reasons.not_linked',
		'empty.trace_to_logs.reasons.not_sent',
		'empty.trace_to_logs.reasons.no_associated_logs',
	],
	documentationLinks: [
		{
			text: 'empty.trace_to_logs.docs.send_logs',
			url: 'https://signoz.io/docs/logs-management/send-logs-to-signoz/',
		},
		{
			text: 'empty.trace_to_logs.docs.correlate',
			url: 'https://signoz.io/docs/traces-management/guides/correlate-traces-and-logs/',
		},
	],
	clearFiltersButtonText: 'empty.trace_to_logs.clear_filters_cta',
	showClearFiltersButton: true,
	onClearFilters: handleClearFilters,
});
