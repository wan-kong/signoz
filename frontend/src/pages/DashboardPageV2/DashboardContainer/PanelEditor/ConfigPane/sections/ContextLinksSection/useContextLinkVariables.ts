import { useMemo } from 'react';
import { useQueryBuilder } from 'hooks/queryBuilder/useQueryBuilder';
import { dtoToFormModel } from 'pages/DashboardPageV2/DashboardContainer/DashboardSettings/Variables/variableAdapters';
import { useDashboardFetchRequired } from 'pages/DashboardPageV2/DashboardContainer/hooks/useDashboardFetchRequired';

import { CONTEXT_LINK_SOURCES, type VariableItem } from './types';

// Global time-range variables, always available (V1 parity: `timestamp_start` / `_end`).
const GLOBAL_TIMESTAMP_VARIABLES: VariableItem[] = [
	{ name: 'timestamp_start', source: CONTEXT_LINK_SOURCES.globalTimestamp },
	{ name: 'timestamp_end', source: CONTEXT_LINK_SOURCES.globalTimestamp },
];

/**
 * Variables offered by the context-link autocomplete, ordered as in V1: global
 * timestamps, then per-query `groupBy` fields (prefixed `_`), then dashboard variables.
 *
 * Self-contained — the editor renders inside the query-builder provider and the
 * DashboardContainer, so every source is read here rather than threaded through the
 * section registry. The dashboard fetch dedupes against the editor page's own query.
 */
export function useContextLinkVariables(): VariableItem[] {
	const { currentQuery } = useQueryBuilder();

	const { variables: variableDtos } = useDashboardFetchRequired();

	const dashboardVariableNames = useMemo(
		() =>
			variableDtos
				.map((dto) => dtoToFormModel(dto).name)
				.filter((name): name is string => !!name),
		[variableDtos],
	);

	// `_`-prefixed to match V1 and avoid colliding with dashboard-variable names.
	const fieldVariableNames = useMemo(() => {
		const names = new Set<string>();
		(currentQuery?.builder?.queryData ?? []).forEach((query) => {
			(query.groupBy ?? []).forEach((field) => {
				if (field.key) {
					names.add(`_${field.key}`);
				}
			});
		});
		return Array.from(names);
	}, [currentQuery?.builder?.queryData]);

	return useMemo(
		() => [
			...GLOBAL_TIMESTAMP_VARIABLES,
			...fieldVariableNames.map(
				(name): VariableItem => ({
					name,
					source: CONTEXT_LINK_SOURCES.queryVariable,
				}),
			),
			...dashboardVariableNames.map(
				(name): VariableItem => ({
					name,
					source: CONTEXT_LINK_SOURCES.dashboardVariable,
				}),
			),
		],
		[fieldVariableNames, dashboardVariableNames],
	);
}
