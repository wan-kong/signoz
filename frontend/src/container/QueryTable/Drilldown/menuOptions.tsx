import i18n from 'ReactI18';
import { OPERATORS } from 'constants/queryBuilder';
import { Braces, ChartBar, DraftingCompass, ScrollText } from '@signozhq/icons';

/**
 * Supported operators for filtering with their display properties
 */
export const SUPPORTED_OPERATORS = {
	[OPERATORS['=']]: {
		label: i18n.t('menu_options.is_this', 'Is this', { ns: 'query_table' }),
		icon: '=',
		value: '=',
	},
	[OPERATORS['!=']]: {
		label: i18n.t('menu_options.is_not_this', 'Is not this', {
			ns: 'query_table',
		}),
		icon: '!=',
		value: '!=',
	},
	[OPERATORS['>=']]: {
		label: i18n.t(
			'menu_options.is_greater_than_or_equal_to',
			'Is greater than or equal to',
			{ ns: 'query_table' },
		),
		icon: '>=',
		value: '>=',
	},
	[OPERATORS['<=']]: {
		label: i18n.t(
			'menu_options.is_less_than_or_equal_to',
			'Is less than or equal to',
			{ ns: 'query_table' },
		),
		icon: '<=',
		value: '<=',
	},
	[OPERATORS['<']]: {
		label: i18n.t('menu_options.is_less_than', 'Is less than', {
			ns: 'query_table',
		}),
		icon: '<',
		value: '<',
	},
};

/**
 * Aggregate menu options for different views
 */
// TO REMOVE
export const AGGREGATE_OPTIONS = [
	{
		key: 'view_logs',
		icon: <ScrollText size={16} />,
		label: i18n.t('menu_options.view_in_logs', 'View in Logs', {
			ns: 'query_table',
		}),
	},
	// {
	// 	key: 'view_metrics',
	// 	icon: <BarChart2 size={16} />,
	// 	label: 'View in Metrics',
	// },
	{
		key: 'view_traces',
		icon: <DraftingCompass size={16} />,
		label: i18n.t('menu_options.view_in_traces', 'View in Traces', {
			ns: 'query_table',
		}),
	},
	{
		key: 'breakout',
		icon: <ChartBar size={16} />,
		label: i18n.t('menu_options.breakout_by', 'Breakout by ..', {
			ns: 'query_table',
		}),
	},
];

/**
 * Aggregate menu options for different views
 */
export const getBaseContextConfig = ({
	handleBaseDrilldown,
	setSubMenu,
	showDashboardVariablesOption,
	showBreakoutOption,
}: {
	handleBaseDrilldown: (key: string) => void;
	setSubMenu: (subMenu: string) => void;
	showDashboardVariablesOption: boolean;
	showBreakoutOption: boolean;
}): {
	key: string;
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
	hidden?: boolean;
}[] => [
	{
		key: 'dashboard_variables',
		icon: <Braces size={16} />,
		label: i18n.t('menu_options.dashboard_variables', 'Dashboard Variables', {
			ns: 'query_table',
		}),
		onClick: (): void => setSubMenu('dashboard_variables'),
		hidden: !showDashboardVariablesOption,
	},
	{
		key: 'view_logs',
		icon: <ScrollText size={16} />,
		label: i18n.t('menu_options.view_in_logs', 'View in Logs', {
			ns: 'query_table',
		}),
		onClick: (): void => handleBaseDrilldown('view_logs'),
	},
	// {
	// 	key: 'view_metrics',
	// 	icon: <BarChart2 size={16} />,
	// 	label: 'View in Metrics',
	// 	onClick: () => handleBaseDrilldown('view_metrics'),
	// },
	{
		key: 'view_traces',
		icon: <DraftingCompass size={16} />,
		label: i18n.t('menu_options.view_in_traces', 'View in Traces', {
			ns: 'query_table',
		}),
		onClick: (): void => handleBaseDrilldown('view_traces'),
	},
	{
		key: 'breakout',
		icon: <ChartBar size={16} />,
		label: i18n.t('menu_options.breakout_by', 'Breakout by ..', {
			ns: 'query_table',
		}),
		onClick: (): void => setSubMenu('breakout'),
		hidden: !showBreakoutOption,
	},
];
