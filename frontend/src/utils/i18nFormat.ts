import { normalizeDetectedLanguage } from '../ReactI18/config';

type FormatLocale = string | null | undefined;

export function getIntlLocale(locale?: FormatLocale): string {
	return normalizeDetectedLanguage(locale);
}

export function formatDateTime(
	value: Date | number | string,
	options: Intl.DateTimeFormatOptions,
	locale?: FormatLocale,
): string {
	return new Intl.DateTimeFormat(getIntlLocale(locale), options).format(
		new Date(value),
	);
}

export function formatNumber(
	value: number,
	options?: Intl.NumberFormatOptions,
	locale?: FormatLocale,
): string {
	return new Intl.NumberFormat(getIntlLocale(locale), options).format(value);
}

export function formatRelativeTime(
	value: number,
	unit: Intl.RelativeTimeFormatUnit,
	options?: Intl.RelativeTimeFormatOptions,
	locale?: FormatLocale,
): string {
	return new Intl.RelativeTimeFormat(getIntlLocale(locale), {
		numeric: 'auto',
		...options,
	}).format(value, unit);
}
