import i18n from 'ReactI18';

/**
 * Where a context-link variable comes from — shown as the right-hand label in the popover.
 *
 * - `Global timestamp` — the dashboard's selected time range: `timestamp_start` /
 *   `timestamp_end`. Always available, independent of the panel or its queries.
 * - `Query variable` — a `groupBy` field from the panel's own queries, `_`-prefixed
 *   (e.g. `_service_name`). Resolved at click time from the data point the user clicked,
 *   so it reflects the current query definition and changes as the queries are edited.
 * - `Dashboard variable` — a user-defined dashboard variable from Dashboard Settings
 *   (e.g. `env`, `region`). Shared across every panel and driven by the dashboard's
 *   variable selectors rather than by an individual query.
 */
export const CONTEXT_LINK_SOURCES = {
	globalTimestamp: i18n.t(
		'context_link_source.global_timestamp',
		'Global timestamp',
		{ ns: 'dashboard' },
	),
	queryVariable: i18n.t('context_link_source.query_variable', 'Query variable', {
		ns: 'dashboard',
	}),
	dashboardVariable: i18n.t(
		'context_link_source.dashboard_variable',
		'Dashboard variable',
		{ ns: 'dashboard' },
	),
} as const;

export type VariableSource =
	(typeof CONTEXT_LINK_SOURCES)[keyof typeof CONTEXT_LINK_SOURCES];

/** One entry in the context-link variable autocomplete. */
export interface VariableItem {
	/** Bare variable name without braces, e.g. `timestamp_start`, `_service_name`, `env`. */
	name: string;
	source: VariableSource;
}

/** A single decoded key/value pair parsed from (or written back to) a URL query string. */
export interface UrlParam {
	key: string;
	value: string;
}
