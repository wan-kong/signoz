import i18n from 'ReactI18';
/**
 * AI Assistant page-action factories for the Logs Explorer.
 *
 * Each factory closes over live page state/callbacks so that `execute()`
 * always operates on the current query. The page component instantiates these
 * with `useMemo` and passes them to `usePageActions`.
 *
 * Filter flow: the V5 query-builder UI binds the WHERE clause CodeMirror
 * editor to `currentQuery.builder.queryData[0].filter.expression`. So we
 * derive the expression from our items via `convertFiltersToExpression`
 * (the same helper `useGetCompositeQueryParam` uses on URL parse) and push
 * BOTH `filters.items` and `filter.expression` into the QueryBuilder
 * provider via `handleSetQueryData`. We then call `redirectWithQueryBuilderData`
 * so the change persists in the URL — and because the items + expression we
 * write match what the URL parser would derive from items alone, the post-
 * navigate state stays consistent with the immediate UI update.
 */

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

interface ChangeViewParams {
	view: 'list' | 'timeseries' | 'table';
}

interface SaveViewParams {
	name: string;
}

/**
 * Replace all active filters and navigate to the updated query URL
 * (which makes the WHERE clause reflect the new filters and triggers a re-run).
 */
export function logsRunQueryAction(
	deps: FilterDeps,
): PageAction<RunQueryParams> {
	return {
		id: 'logs.runQuery',
		description: i18n.t(
			'ai_actions.replace_filters',
			'Replace the active log filters and re-run the query',
			{
				ns: 'common',
				dataSource: 'log',
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
									'ai_actions.attribute_key_description',
									'Attribute key, e.g. severity_text',
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
						'No active query found in Logs Explorer.',
						{
							ns: 'common',
							explorer: 'Logs Explorer',
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

			// Push to in-memory state first so the WHERE clause re-renders without
			// waiting on a URL round-trip. Then sync URL for persistence/sharing.
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
 * Append a single filter to the existing query and navigate to the updated URL.
 */
export function logsAddFilterAction(
	deps: FilterDeps,
): PageAction<AddFilterParams> {
	return {
		id: 'logs.addFilter',
		description: i18n.t(
			'ai_actions.add_single_filter',
			'Add a single filter to the current log query and re-run',
			{
				ns: 'common',
				dataSource: 'log',
			},
		),
		parameters: {
			type: 'object',
			properties: {
				key: {
					type: 'string',
					description: i18n.t(
						'ai_actions.attribute_key_description',
						'Attribute key, e.g. severity_text',
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
						'No active query found in Logs Explorer.',
						{
							ns: 'common',
							explorer: 'Logs Explorer',
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
 * Switch the explorer between list / timeseries / table views.
 */
export function logsChangeViewAction(deps: {
	onChangeView: (view: 'list' | 'timeseries' | 'table') => void;
}): PageAction<ChangeViewParams> {
	return {
		id: 'logs.changeView',
		description: i18n.t(
			'ai_actions.change_view',
			'Switch the Logs Explorer between list, timeseries, and table views',
			{ ns: 'common', explorer: 'Logs Explorer' },
		),
		parameters: {
			type: 'object',
			properties: {
				view: {
					type: 'string',
					enum: ['list', 'timeseries', 'table'],
					description: i18n.t(
						'ai_actions.switch_to_view',
						'The panel view to switch to',
						{
							ns: 'common',
						},
					),
				},
			},
			required: ['view'],
		},
		execute: async ({ view }): Promise<ActionResult> => {
			deps.onChangeView(view);
			return {
				summary: i18n.t(
					'ai_actions.switched_to_view',
					'Switched to the "{{view}}" view.',
					{
						ns: 'common',
						view,
					},
				),
			};
		},
	};
}

/**
 * Save the current query as a named view (stub — wires to real API when available).
 */
export function logsSaveViewAction(deps: {
	onSaveView: (name: string) => Promise<void>;
}): PageAction<SaveViewParams> {
	return {
		id: 'logs.saveView',
		description: i18n.t(
			'ai_actions.save_current_query',
			'Save the current log query as a named view',
			{
				ns: 'common',
				dataSource: 'log',
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
