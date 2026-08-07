import i18n from 'ReactI18';
import { QueryParams } from 'constants/query';
import ROUTES from 'constants/routes';
import { withBasePath } from 'utils/basePath';

import { TopOperationList } from './TopOperationsTable';
import { NavigateToTraceProps } from './types';

export const getErrorRate = (list: TopOperationList): number => {
	if (list.errorCount === 0 && list.numCalls === 0) {
		return 0;
	}
	return (list.errorCount / list.numCalls) * 100;
};

export const navigateToTrace = ({
	servicename,
	operation,
	minTime,
	maxTime,
	selectedTraceTags,
	apmToTraceQuery,
	safeNavigate,
	openInNewTab = false,
}: NavigateToTraceProps): void => {
	const urlParams = new URLSearchParams();
	urlParams.set(
		QueryParams.startTime,
		Math.floor(minTime / 1_000_000).toString(),
	);
	urlParams.set(QueryParams.endTime, Math.floor(maxTime / 1_000_000).toString());

	const JSONCompositeQuery = encodeURIComponent(JSON.stringify(apmToTraceQuery));

	const newTraceExplorerPath = `${
		ROUTES.TRACES_EXPLORER
	}?${urlParams.toString()}&selected={"serviceName":["${servicename}"],"operation":["${operation}"]}&filterToFetchData=["duration","status","serviceName","operation"]&spanAggregateCurrentPage=1&selectedTags=${selectedTraceTags}&${
		QueryParams.compositeQuery
	}=${JSONCompositeQuery}`;

	if (openInNewTab) {
		window.open(withBasePath(newTraceExplorerPath), '_blank');
	} else {
		safeNavigate(newTraceExplorerPath);
	}
};

export const getNearestHighestBucketValue = (
	value: number,
	buckets: number[],
): string => {
	// sort the buckets
	buckets.sort((a, b) => a - b);
	const nearestBucket = buckets.find((bucket) => bucket >= value);
	return nearestBucket?.toString() || '+Inf';
};

export const convertMilSecToNanoSec = (value: number): number =>
	value * 1000000000;

export const convertedTracesToDownloadData = (
	originalData: TopOperationList[],
): Record<string, string>[] =>
	originalData.map((item) => {
		const newObj: Record<string, string> = {
			[i18n.t('name', 'Name', { ns: 'common' })]: item.name,
			[i18n.t('p50_ms', 'P50 (in ms)', { ns: 'common' })]: (
				item.p50 / 1000000
			).toFixed(2),
			[i18n.t('p95_ms', 'P95 (in ms)', { ns: 'common' })]: (
				item.p95 / 1000000
			).toFixed(2),
			'P99 (in ms)': (item.p99 / 1000000).toFixed(2),
			'Number of calls': item.numCalls.toString(),
			'Error Rate (%)': getErrorRate(item).toFixed(2),
		};

		return newObj;
	});
