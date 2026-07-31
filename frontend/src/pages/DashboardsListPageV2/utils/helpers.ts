import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import type {
	DashboardtypesListedDashboardForUserV2DTO,
	TagtypesPostableTagDTO,
} from 'api/generated/services/sigNoz.schemas';

// The list is fetched via the per-user endpoint, so every row carries `pinned`.
export type DashboardListItem = DashboardtypesListedDashboardForUserV2DTO;

export const tagsToStrings = (
	tags: { key: string; value: string }[] | null | undefined,
): string[] =>
	// Always render both sides (so an env:env tag reads "env:env", not a lone
	// "env"); fall back to the bare key only when there's no value.
	(tags ?? []).map((tag) => (tag.value ? `${tag.key}:${tag.value}` : tag.key));

// Convert validated `key:value` tag strings (from TagKeyValueInput) into the
// postable tag DTO shape. The first colon separates key from value.
export const keyValueStringsToTags = (
	tags: string[],
): TagtypesPostableTagDTO[] =>
	tags
		.map((tag) => {
			const idx = tag.indexOf(':');
			if (idx <= 0) {
				return null;
			}
			return {
				key: tag.slice(0, idx).trim(),
				value: tag.slice(idx + 1).trim(),
			};
		})
		.filter((t): t is TagtypesPostableTagDTO => !!t?.key && !!t.value);

export interface LastUpdatedCopy {
	key: string;
	count?: number;
}

export const lastUpdatedCopy = (time: string | undefined): LastUpdatedCopy => {
	if (!time || isEmpty(time)) {
		return { key: 'dashboards_list_page_v2.last_updated.no_updates_yet' };
	}
	const diff = dayjs();
	const ref = dayjs(time);
	const months = diff.diff(ref, 'months');
	if (months > 0) {
		return {
			key: 'dashboards_list_page_v2.last_updated.months_ago',
			count: months,
		};
	}
	const days = diff.diff(ref, 'days');
	if (days > 0) {
		return { key: 'dashboards_list_page_v2.last_updated.days_ago', count: days };
	}
	const hours = diff.diff(ref, 'hours');
	if (hours > 0) {
		return {
			key: 'dashboards_list_page_v2.last_updated.hours_ago',
			count: hours,
		};
	}
	const minutes = diff.diff(ref, 'minutes');
	if (minutes > 0) {
		return {
			key: 'dashboards_list_page_v2.last_updated.minutes_ago',
			count: minutes,
		};
	}
	const seconds = diff.diff(ref, 'seconds');
	return {
		key: 'dashboards_list_page_v2.last_updated.seconds_ago',
		count: seconds,
	};
};

// Normalize BE query-parse error messages for display:
//   - Drop the "invalid filter query:" prefix (the UI already says "Invalid query").
//   - Backticks → double quotes for the format hint that follows the em-dash.
//   - Trim surrounding whitespace.
export const formatQueryErrorMessage = (raw: string | undefined): string => {
	if (!raw) {
		return '';
	}
	return raw
		.replace(/^invalid filter query:\s*/i, '')
		.replace(/`([^`]+)`/g, '"$1"')
		.trim();
};
