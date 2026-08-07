/**
 * AI Assistant page-action factories for the Metrics Explorer.
 *
 * The metrics explorer renders a single timeseries view via QueryBuilderV2,
 * so it exposes only filter-mutating actions (no `changeView`). Saving a
 * view is included as a stub for parity with the logs/traces actions.
 *
 * See `pages/LogsExplorer/aiActions.ts` for the rationale behind writing
 * BOTH `filters.items` and `filter.expression` and then re-using the same
 * URL parser shape via `redirectWithQueryBuilderData`.
 */

import i18n from 'ReactI18';
import { convertFiltersToExpression } from 'components/QueryBuilderV2/utils';
import {
	aiFilterToTagFilterItem,
	FILTER_OP_ENUM,
	FILTER_VALUE_DESCRIPTION,
	FilterDeps,
	replaceFirstQueryData,
} from 'container/AIAssistant/pageActions/builderQueryHelpers';
import {
	ActionResult,
	PageAction,
} from 'container/AIAssistant/pageActions/types';
import {
	IBuilderQuery,
	TagFilterItem,
} from 'types/api/queryBuilder/queryBuilderData';

interface AIFilter {
	key: string;
	op: string;
	value: string;
}

interface RunQueryParams {
	filters: AIFilter[];
}

interface AddFilterParams {
	key: string;
	op: string;
	value: string;
}

interface SaveViewParams {
	name: string;
}

/**
 * Replace all active label filters and navigate to the updated query URL
 * (which makes the WHERE clause reflect the new filters and triggers a re-run).
 */
export function metricsRunQueryAction(
	deps: FilterDeps,
): PageAction<RunQueryParams> {
	return {
		id: 'metrics.runQuery',
		description: i18n.t(
			'ai_actions.replace_filters',
			'Replace the active metric filters and re-run the query',
			{
				ns: 'common',
				dataSource: 'metric',
			},
		),
		parameters: {
			type: 'object',
			properties: {
				filters: {
					type: 'array',
					description: i18n.t(
						'ai_actions.replacement_filter_list',
						'Replacement filter list',
						{
							ns: 'common',
						},
					),
					items: {
						type: 'object',
						properties: {
							key: {
								type: 'string',
								description: i18n.t(
									'ai_actions.label_key_description',
									'Label key, e.g. service_name, deployment_environment',
									{ ns: 'common' },
								),
							},
							op: {
								type: 'string',
								enum: [...FILTER_OP_ENUM],
							},
							value: {
								type: 'string',
								description: FILTER_VALUE_DESCRIPTION,
							},
						},
						required: ['key', 'op', 'value'],
					},
				},
			},
			required: ['filters'],
		},
		autoApply: true,
		execute: async ({ filters }): Promise<ActionResult> => {
			const baseQuery = deps.currentQuery.builder.queryData[0];
			if (!baseQuery) {
				throw new Error(
					i18n.t(
						'ai_actions.no_active_query',
						'No active query found in Metrics Explorer.',
						{
							ns: 'common',
							explorer: 'Metrics Explorer',
						},
					),
				);
			}

			const tagItems = filters.map(aiFilterToTagFilterItem);
			const newFilters = { items: tagItems, op: 'AND' };
			const updatedBuilderQuery: IBuilderQuery = {
				...baseQuery,
				filters: newFilters,
				filter: convertFiltersToExpression(newFilters),
			};

			deps.handleSetQueryData(0, updatedBuilderQuery);
			deps.redirectWithQueryBuilderData(
				replaceFirstQueryData(deps.currentQuery, updatedBuilderQuery),
			);

			return {
				summary: i18n.t(
					'ai_actions.query_updated',
					'Query updated with {{count}} filter(s) and re-run.',
					{ ns: 'common', count: filters.length },
				),
			};
		},
		getContext: (): Record<string, unknown> => ({
			filters:
				deps.currentQuery.builder.queryData[0]?.filters?.items?.map(
					(f: TagFilterItem) => ({
						key: f.key?.key,
						op: f.op,
						value: f.value,
					}),
				) ?? [],
		}),
	};
}

/**
 * Append a single label filter to the existing metric query and navigate
 * to the updated URL.
 */
export function metricsAddFilterAction(
	deps: FilterDeps,
): PageAction<AddFilterParams> {
	return {
		id: 'metrics.addFilter',
		description: i18n.t(
			'ai_actions.add_single_filter',
			'Add a single filter to the current metric query and re-run',
			{
				ns: 'common',
				dataSource: 'metric',
			},
		),
		parameters: {
			type: 'object',
			properties: {
				key: {
					type: 'string',
					description: i18n.t(
						'ai_actions.label_key_description',
						'Label key, e.g. service_name, deployment_environment',
						{ ns: 'common' },
					),
				},
				op: {
					type: 'string',
					enum: [...FILTER_OP_ENUM],
				},
				value: {
					type: 'string',
					description: FILTER_VALUE_DESCRIPTION,
				},
			},
			required: ['key', 'op', 'value'],
		},
		autoApply: true,
		execute: async ({ key, op, value }): Promise<ActionResult> => {
			const baseQuery = deps.currentQuery.builder.queryData[0];
			if (!baseQuery) {
				throw new Error(
					i18n.t(
						'ai_actions.no_active_query',
						'No active query found in Metrics Explorer.',
						{
							ns: 'common',
							explorer: 'Metrics Explorer',
						},
					),
				);
			}

			const existing = baseQuery.filters?.items ?? [];
			const newItem = aiFilterToTagFilterItem({ key, op, value });
			const newFilters = { items: [...existing, newItem], op: 'AND' };
			const updatedBuilderQuery: IBuilderQuery = {
				...baseQuery,
				filters: newFilters,
				filter: convertFiltersToExpression(newFilters),
			};

			deps.handleSetQueryData(0, updatedBuilderQuery);
			deps.redirectWithQueryBuilderData(
				replaceFirstQueryData(deps.currentQuery, updatedBuilderQuery),
			);

			return {
				summary: i18n.t(
					'ai_actions.filter_added',
					'Filter added: {{key}} {{op}} "{{value}}". Query re-run.',
					{ ns: 'common', key, op, value },
				),
			};
		},
	};
}

/**
 * Save the current metric query as a named view (stub — wires to real API
 * when available).
 */
export function metricsSaveViewAction(deps: {
	onSaveView: (name: string) => Promise<void>;
}): PageAction<SaveViewParams> {
	return {
		id: 'metrics.saveView',
		description: i18n.t(
			'ai_actions.save_current_query',
			'Save the current metric query as a named view',
			{
				ns: 'common',
				dataSource: 'metric',
			},
		),
		parameters: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: i18n.t(
						'ai_actions.name_for_saved_view',
						'Name for the saved view',
						{
							ns: 'common',
						},
					),
				},
			},
			required: ['name'],
		},
		execute: async ({ name }): Promise<ActionResult> => {
			await deps.onSaveView(name);
			return {
				summary: i18n.t('ai_actions.view_saved', 'View "{{name}}" saved.', {
					ns: 'common',
					name,
				}),
			};
		},
	};
}
