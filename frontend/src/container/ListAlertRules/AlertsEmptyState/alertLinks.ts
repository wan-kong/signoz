import { DataSource } from 'types/common/queryBuilder';

export const ALERT_INFO_LINKS = [
	{
		infoTextKey: 'alert_rules.empty.info_links.metrics',
		link:
			'https://signoz.io/docs/alerts-management/metrics-based-alerts/?utm_source=product&utm_medium=alert-empty-page',
		leftIconVisible: false,
		rightIconVisible: true,
		dataSource: DataSource.METRICS,
	},
	{
		infoTextKey: 'alert_rules.empty.info_links.logs',
		link:
			'https://signoz.io/docs/alerts-management/log-based-alerts/?utm_source=product&utm_medium=alert-empty-page',
		leftIconVisible: false,
		rightIconVisible: true,
		dataSource: DataSource.LOGS,
	},
	{
		infoTextKey: 'alert_rules.empty.info_links.traces',
		link:
			'https://signoz.io/docs/alerts-management/trace-based-alerts/?utm_source=product&utm_medium=alert-empty-page',
		leftIconVisible: false,
		rightIconVisible: true,
		dataSource: DataSource.TRACES,
	},
];

export const ALERT_CARDS = [
	{
		headerKey: 'alert_rules.empty.sample_cards.high_memory.header',
		subheaderKey: 'alert_rules.empty.sample_cards.high_memory.subheader',
		dataSource: DataSource.METRICS,
		link:
			'https://signoz.io/docs/alerts-management/metrics-based-alerts/?utm_source=product&utm_medium=alert-empty-page#1-alert-when-memory-usage-for-host-goes-above-400-mb-or-any-fixed-memory',
	},
	{
		headerKey: 'alert_rules.empty.sample_cards.slow_external_api.header',
		subheaderKey: 'alert_rules.empty.sample_cards.slow_external_api.subheader',
		dataSource: DataSource.TRACES,
		link:
			'https://signoz.io/docs/alerts-management/trace-based-alerts/?utm_source=product&utm_medium=alert-empty-page#1-alert-when-external-api-latency-p90-is-over-1-second-for-last-5-mins',
	},
	{
		headerKey: 'alert_rules.empty.sample_cards.timeout_errors.header',
		subheaderKey: 'alert_rules.empty.sample_cards.timeout_errors.subheader',
		dataSource: DataSource.LOGS,
		link:
			'https://signoz.io/docs/alerts-management/log-based-alerts/?utm_source=product&utm_medium=alert-empty-page#1-alert-when-percentage-of-redis-timeout-error-logs-greater-than-7-in-last-5-mins',
	},
	{
		headerKey: 'alert_rules.empty.sample_cards.endpoint_errors.header',
		subheaderKey: 'alert_rules.empty.sample_cards.endpoint_errors.subheader',
		dataSource: DataSource.METRICS,
		link:
			'https://signoz.io/docs/alerts-management/metrics-based-alerts/?utm_source=product&utm_medium=alert-empty-page#3-alert-when-the-error-percentage-for-an-endpoint-exceeds-5',
	},
];
