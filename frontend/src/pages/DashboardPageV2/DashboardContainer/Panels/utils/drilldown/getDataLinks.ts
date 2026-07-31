import type { FilterData } from 'container/QueryTable/Drilldown/drilldownUtils';

/** An auto-generated drilldown link (label + destination URL). */
export interface DrilldownDataLink {
	id: string;
	labelKey: string;
	url: string;
}

/**
 * Links derived automatically from the clicked point's filters — the V2 port of V1's `getDataLinks`.
 * Currently a single "View Trace Details" link when the clicked row carries a `trace_id`.
 */
export function getDataLinks(filters: FilterData[]): DrilldownDataLink[] {
	const links: DrilldownDataLink[] = [];

	const traceId = filters.find(
		(filter) => filter.filterKey === 'trace_id',
	)?.filterValue;
	if (traceId) {
		links.push({
			id: 'view-trace-details',
			labelKey: 'dashboard_page_v2.drilldown.view_trace_details',
			url: `/trace/${traceId}`,
		});
	}

	return links;
}
