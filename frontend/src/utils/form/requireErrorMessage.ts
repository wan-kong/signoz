import i18n from 'ReactI18';

export const requireErrorMessage = (fieldName: string): string =>
	i18n.t('form.missing_field', 'Missing {{field}}', {
		field: fieldName,
		ns: 'common',
	});
