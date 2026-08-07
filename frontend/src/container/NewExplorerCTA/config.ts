import i18n from 'ReactI18';
import ROUTES from 'constants/routes';

export const buttonText: Record<string, string> = {
	[ROUTES.LOGS_EXPLORER]: i18n.t('new_explorer.old_explorer', 'Old Explorer', {
		ns: 'common',
	}),
	[ROUTES.TRACE]: i18n.t('new_explorer.new_explorer', 'New Explorer', {
		ns: 'common',
	}),
	[ROUTES.OLD_LOGS_EXPLORER]: i18n.t(
		'new_explorer.new_explorer',
		'New Explorer',
		{ ns: 'common' },
	),
	[ROUTES.TRACES_EXPLORER]: i18n.t('new_explorer.old_explorer', 'Old Explorer', {
		ns: 'common',
	}),
};
