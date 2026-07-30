import {
	formatDateTime,
	formatNumber,
	formatRelativeTime,
	getIntlLocale,
} from './i18nFormat';

describe('i18nFormat', () => {
	it('normalizes unsupported locales to the fallback locale', () => {
		expect(getIntlLocale('fr-FR')).toBe('en');
		expect(getIntlLocale('zh-Hans')).toBe('zh-CN');
	});

	it('formats numbers with the requested locale', () => {
		expect(formatNumber(1234.5, undefined, 'en')).toBe('1,234.5');
		expect(formatNumber(1234.5, undefined, 'zh-CN')).toBe('1,234.5');
	});

	it('formats relative time with the requested locale', () => {
		expect(formatRelativeTime(-1, 'day', undefined, 'en')).toBe('yesterday');
		expect(formatRelativeTime(-1, 'day', undefined, 'zh-CN')).toBe('昨天');
	});

	it('formats dates without hard-coding en-US', () => {
		const date = new Date(Date.UTC(2023, 9, 20, 8, 30, 0));

		expect(
			formatDateTime(
				date,
				{
					timeZone: 'UTC',
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				},
				'en',
			),
		).toBe('Oct 20, 2023');
		expect(
			formatDateTime(
				date,
				{
					timeZone: 'UTC',
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				},
				'zh-CN',
			),
		).toBe('2023年10月20日');
	});
});
