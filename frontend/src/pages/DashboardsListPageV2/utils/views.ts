// Built-in view catalogue + the pure logic that maps a view to how it
// constrains the list. Views fall into two mechanisms:
//   - snapshot:  selecting applies a filter snapshot — some seed the search box
//                with DSL (My dashboards → created_by; Locked → locked = true)
//   - client:    constrains by a client-side id set (Favorites, Recently viewed)
import { Clock, Layers, Lock, Pin, User } from '@signozhq/icons';

import { createdByClause } from './filterQuery';
import { BuiltinViewId } from '../types';
import type { ViewSection } from '../types';
import type { DashboardListItem } from './helpers';

// All @signozhq icons share this component type.
export type ViewIcon = typeof Pin;

export interface BuiltinView {
	id: BuiltinViewId;
	labelKey: string;
	icon: ViewIcon;
	section: Exclude<ViewSection, 'custom'>;
}

export const BUILTIN_VIEWS: BuiltinView[] = [
	{
		id: BuiltinViewId.Mine,
		labelKey: 'dashboards_list_page_v2.views.builtin.my_dashboards',
		icon: User,
		section: 'personal',
	},
	{
		id: BuiltinViewId.Pinned,
		labelKey: 'dashboards_list_page_v2.views.builtin.pinned',
		icon: Pin,
		section: 'personal',
	},
	{
		id: BuiltinViewId.Recent,
		labelKey: 'dashboards_list_page_v2.views.builtin.recently_viewed',
		icon: Clock,
		section: 'personal',
	},
	{
		id: BuiltinViewId.All,
		labelKey: 'dashboards_list_page_v2.views.builtin.all_dashboards',
		icon: Layers,
		section: 'system',
	},
	{
		id: BuiltinViewId.Locked,
		labelKey: 'dashboards_list_page_v2.views.builtin.locked',
		icon: Lock,
		section: 'system',
	},
];

// Pinned/Recently-viewed constrain client-side — Pinned by the per-row `pinned`
// flag, Recently-viewed by a localStorage id set — so they filter the fetched
// rows rather than adding a server clause.
export const isClientView = (id: string): boolean =>
	id === BuiltinViewId.Pinned || id === BuiltinViewId.Recent;

// DSL the Locked view applies — visible and editable in the query box rather
// than applied invisibly behind the scenes.
export const LOCKED_QUERY = 'locked = true';

// The canonical query string a built-in view applies when selected. `null` for
// ids that aren't built-in (custom views carry their own query).
export const builtinViewQuery = (
	id: string,
	userEmail: string,
): string | null => {
	switch (id) {
		case BuiltinViewId.Mine:
			return userEmail ? (createdByClause([userEmail]) ?? '') : '';
		case BuiltinViewId.Locked:
			return LOCKED_QUERY;
		case BuiltinViewId.All:
		case BuiltinViewId.Pinned:
		case BuiltinViewId.Recent:
			return '';
		default:
			return null;
	}
};

export interface EmptyStateCopy {
	titleKey: string;
	descriptionKey: string;
	values?: Record<string, string>;
}

// Context-aware copy for the no-results state, so an empty Locked view doesn't
// read like a failed search ("No dashboards found for .").
export const noResultsCopy = (
	activeViewId: string,
	search: string,
	hasActiveFilters: boolean,
): EmptyStateCopy => {
	const trimmed = search.trim();
	if (trimmed) {
		return {
			titleKey: 'dashboards_list_page_v2.no_results.search_title',
			descriptionKey: 'dashboards_list_page_v2.no_results.search_description',
			values: { search: trimmed },
		};
	}
	switch (activeViewId) {
		case BuiltinViewId.Pinned:
			return {
				titleKey: 'dashboards_list_page_v2.no_results.no_pinned_title',
				descriptionKey: 'dashboards_list_page_v2.no_results.no_pinned_description',
			};
		case BuiltinViewId.Recent:
			return {
				titleKey: 'dashboards_list_page_v2.no_results.no_recent_title',
				descriptionKey: 'dashboards_list_page_v2.no_results.no_recent_description',
			};
		case BuiltinViewId.Locked:
			return {
				titleKey: 'dashboards_list_page_v2.no_results.no_locked_title',
				descriptionKey: 'dashboards_list_page_v2.no_results.no_locked_description',
			};
		case BuiltinViewId.Mine:
			return {
				titleKey: 'dashboards_list_page_v2.no_results.no_mine_title',
				descriptionKey: 'dashboards_list_page_v2.no_results.no_mine_description',
			};
		default:
			return hasActiveFilters
				? {
						titleKey: 'dashboards_list_page_v2.no_results.no_filter_match_title',
						descriptionKey:
							'dashboards_list_page_v2.no_results.no_filter_match_description',
					}
				: {
						titleKey: 'dashboards_list_page_v2.no_results.no_dashboards_title',
						descriptionKey:
							'dashboards_list_page_v2.no_results.no_dashboards_description',
					};
	}
};

// Apply a client-side view's constraint to already-fetched rows. Pinned filters
// by the per-row `pinned` flag; Recently-viewed filters by a localStorage id set
// and preserves visit order regardless of the active sort.
export const applyClientView = (
	items: DashboardListItem[],
	id: string,
	recent: string[],
): DashboardListItem[] => {
	if (id === BuiltinViewId.Pinned) {
		return items.filter((d) => d.pinned);
	}
	if (id === BuiltinViewId.Recent) {
		const order = new Map(recent.map((rid, index) => [rid, index]));
		return items
			.filter((d) => order.has(d.id))
			.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
	}
	return items;
};
