import i18n from 'ReactI18';

/**
 * Masks a key string, showing only the first 2 and last 2 characters.
 */
export function getMaskedKey(key: string): string {
	if (!key || key.length < 4) {
		return key || i18n.t('constants_extra.na', 'N/A', { ns: 'common' });
	}
	return `${key.substring(0, 2)}·······${key.slice(-2).trim()}`;
}
