import { TableProps } from 'antd';
import i18n from 'ReactI18';
import { ServicesList } from 'types/api/metrics/getService';

export type ServiceColumn = NonNullable<
	TableProps<ServicesList>['columns']
>[number] & {
	titleKey: string;
};

export const SERVICE_COLUMNS: ServiceColumn[] = [
	{
		titleKey: 'services.columns.application',
		dataIndex: 'serviceName',
		key: 'serviceName',
	},
	{
		titleKey: 'services.columns.p99_latency',
		dataIndex: 'p99',
		key: 'p99',
		render: (value: number): string => (value / 1000000).toFixed(2),
	},
	{
		titleKey: 'services.columns.error_rate',
		dataIndex: 'errorRate',
		key: 'errorRate',

		render: (value: number): string => value.toFixed(2),
	},
	{
		titleKey: 'services.columns.call_rate',
		dataIndex: 'callRate',
		key: 'callRate',
		render: (value: number): string => value.toFixed(2),
	},
];

export enum TimeIntervalsEnum {
	LAST_5_MINUTES = 60 * 5 * 1000, // 300000
	LAST_15_MINUTES = 60 * 15 * 1000, // 900000
	LAST_30_MINUTES = 60 * 30 * 1000, // 1800000
	LAST_1_HOUR = 60 * 60 * 1000, // 3600000
	LAST_6_HOURS = 60 * 60 * 6 * 1000, // 21600000
	LAST_1_DAY = 60 * 60 * 24 * 1000, // 86400000
	LAST_3_DAYS = 60 * 60 * 24 * 3 * 1000, // 259200000
	LAST_7_DAYS = 60 * 60 * 24 * 7 * 1000, // 604800000
	LAST_30_DAYS = 60 * 60 * 24 * 30 * 1000, // 2592000000
}

export const TIME_PICKER_OPTIONS = [
	{
		value: TimeIntervalsEnum.LAST_5_MINUTES,
		label: i18n.t('time_ranges.last_5_minutes', 'Last 5 minutes', {
			ns: 'common',
		}),
		labelKey: 'time.last_5_minutes',
	},
	{
		value: TimeIntervalsEnum.LAST_15_MINUTES,
		label: i18n.t('time_ranges.last_15_minutes', 'Last 15 minutes', {
			ns: 'common',
		}),
		labelKey: 'time.last_15_minutes',
	},
	{
		value: TimeIntervalsEnum.LAST_30_MINUTES,
		label: i18n.t('time_ranges.last_30_minutes', 'Last 30 minutes', {
			ns: 'common',
		}),
		labelKey: 'time.last_30_minutes',
	},
	{
		value: TimeIntervalsEnum.LAST_1_HOUR,
		label: i18n.t('time_ranges.last_1_hour', 'Last 1 hour', {
			ns: 'common',
		}),
		labelKey: 'time.last_1_hour',
	},
	{
		value: TimeIntervalsEnum.LAST_6_HOURS,
		label: i18n.t('time_ranges.last_6_hours', 'Last 6 hours', {
			ns: 'common',
		}),
		labelKey: 'time.last_6_hours',
	},
	{
		value: TimeIntervalsEnum.LAST_1_DAY,
		label: i18n.t('time_ranges.last_1_day', 'Last 1 day', {
			ns: 'common',
		}),
		labelKey: 'time.last_1_day',
	},
	{
		value: TimeIntervalsEnum.LAST_3_DAYS,
		label: i18n.t('time_ranges.last_3_days', 'Last 3 days', {
			ns: 'common',
		}),
		labelKey: 'time.last_3_days',
	},
	{
		value: TimeIntervalsEnum.LAST_7_DAYS,
		label: i18n.t('time_ranges.last_1_week', 'Last 1 week', {
			ns: 'common',
		}),
		labelKey: 'time.last_1_week',
	},
	{
		value: TimeIntervalsEnum.LAST_30_DAYS,
		label: i18n.t('time_ranges.last_1_month', 'Last 1 month', {
			ns: 'common',
		}),
		labelKey: 'time.last_1_month',
	},
];
