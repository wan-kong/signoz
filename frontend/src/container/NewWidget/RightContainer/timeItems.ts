import i18n from 'ReactI18';

export const timeItems: timePreferance[] = [
	{
		name: i18n.t('time_items.global_time', 'Global Time', {
			ns: 'new_widget_components',
		}),
		enum: 'GLOBAL_TIME',
	},
	{
		name: i18n.t('time_items.last_5_min', 'Last 5 min', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_5_MIN',
	},
	{
		name: i18n.t('time_items.last_15_min', 'Last 15 min', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_15_MIN',
	},
	{
		name: i18n.t('time_items.last_30_min', 'Last 30 min', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_30_MIN',
	},
	{
		name: i18n.t('time_items.last_1_hr', 'Last 1 hr', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_1_HR',
	},
	{
		name: i18n.t('time_items.last_6_hr', 'Last 6 hr', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_6_HR',
	},
	{
		name: i18n.t('time_items.last_1_day', 'Last 1 day', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_1_DAY',
	},
	{
		name: i18n.t('time_items.last_3_days', 'Last 3 days', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_3_DAYS',
	},
	{
		name: i18n.t('time_items.last_1_week', 'Last 1 week', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_1_WEEK',
	},
	{
		name: i18n.t('time_items.last_1_month', 'Last 1 month', {
			ns: 'new_widget_components',
		}),
		enum: 'LAST_1_MONTH',
	},
];

export interface timePreferance {
	name: string;
	enum: timePreferenceType;
}

export type timePreferenceType =
	| GLOBAL_TIME
	| LAST_5_MIN
	| LAST_15_MIN
	| LAST_30_MIN
	| LAST_1_HR
	| LAST_6_HR
	| LAST_1_DAY
	| LAST_3_DAYS
	| LAST_1_WEEK
	| LAST_1_MONTH;

type GLOBAL_TIME = 'GLOBAL_TIME';
type LAST_5_MIN = 'LAST_5_MIN';
type LAST_15_MIN = 'LAST_15_MIN';
type LAST_30_MIN = 'LAST_30_MIN';
type LAST_1_HR = 'LAST_1_HR';
type LAST_6_HR = 'LAST_6_HR';
type LAST_1_DAY = 'LAST_1_DAY';
type LAST_3_DAYS = 'LAST_3_DAYS';
type LAST_1_WEEK = 'LAST_1_WEEK';
type LAST_1_MONTH = 'LAST_1_MONTH';

export default timeItems;
