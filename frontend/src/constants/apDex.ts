import i18n from 'ReactI18';

export const apDexToolTipText = i18n.t(
	'constants.apdex_tooltip',
	"Apdex is a way to measure your users' satisfaction with the response time of your web service. It's represented as a score from 0-1.",
	{ ns: 'common' },
);
export const apDexToolTipUrl =
	'https://signoz.io/docs/alerts-management/apdex-alerts/?utm_source=product&utm_medium=frontend&utm_campaign=apdex';
export const apDexToolTipUrlText = i18n.t(
	'constants_extra.apdex_learn_more',
	'Learn more about Apdex.',
	{ ns: 'common' },
);
