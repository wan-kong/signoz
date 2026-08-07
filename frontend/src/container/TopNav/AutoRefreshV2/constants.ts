import i18n from 'ReactI18';

export interface IOptions {
	label: string;
	key: string;
	value: number;
}

export const refreshIntervalOptions: IOptions[] = [
	{
		label: i18n.t('auto_refresh.interval.off', 'off', { ns: 'topnav' }),
		key: 'off',
		value: 0,
	},
	{
		label: i18n.t('auto_refresh.interval.5_seconds', '5 seconds', {
			ns: 'topnav',
		}),
		key: '5s',
		value: 5000,
	},
	{
		label: i18n.t('auto_refresh.interval.10_seconds', '10 seconds', {
			ns: 'topnav',
		}),
		key: '10s',
		value: 10000,
	},
	{
		label: i18n.t('auto_refresh.interval.30_seconds', '30 seconds', {
			ns: 'topnav',
		}),
		key: '30s',
		value: 30000,
	},
	{
		label: i18n.t('auto_refresh.interval.1_minute', '1 minute', {
			ns: 'topnav',
		}),
		key: '1m',
		value: 60000,
	},
	{
		label: i18n.t('auto_refresh.interval.5_minutes', '5 minutes', {
			ns: 'topnav',
		}),
		key: '5m',
		value: 300000,
	},
	{
		label: i18n.t('auto_refresh.interval.10_minutes', '10 minutes', {
			ns: 'topnav',
		}),
		key: '10m',
		value: 600000,
	},
	{
		label: i18n.t('auto_refresh.interval.30_minutes', '30 minutes', {
			ns: 'topnav',
		}),
		key: '30m',
		value: 1800000,
	},
	{
		label: i18n.t('auto_refresh.interval.1_hour', '1 hour', { ns: 'topnav' }),
		key: '1h',
		value: 3600000,
	},
	{
		label: i18n.t('auto_refresh.interval.2_hours', '2 hours', {
			ns: 'topnav',
		}),
		key: '2h',
		value: 7200000,
	},
	{
		label: i18n.t('auto_refresh.interval.1_day', '1 day', { ns: 'topnav' }),
		key: '1d',
		value: 86400000,
	},
];
