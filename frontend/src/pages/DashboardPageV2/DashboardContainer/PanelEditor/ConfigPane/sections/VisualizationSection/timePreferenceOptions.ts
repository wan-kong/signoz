import { DashboardtypesTimePreferenceDTO } from 'api/generated/services/sigNoz.schemas';

import type { ConfigSelectItem } from '../../controls/ConfigSelect/ConfigSelect';

type TimePreferenceOption = Omit<
	ConfigSelectItem<DashboardtypesTimePreferenceDTO>,
	'label'
> & {
	labelKey: string;
};

// Per-panel time scope. "Global Time" follows the dashboard's time picker; the rest pin
// the panel to a fixed relative window regardless of the dashboard range (V1 parity).
export const TIME_PREFERENCE_OPTIONS: TimePreferenceOption[] = [
	{
		value: DashboardtypesTimePreferenceDTO.global_time,
		labelKey: 'dashboard_page_v2.panel_config.visualization.global_time',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_5_min,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_5_min',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_15_min,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_15_min',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_30_min,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_30_min',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_1_hr,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_1_hr',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_6_hr,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_6_hr',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_1_day,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_1_day',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_3_days,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_3_days',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_1_week,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_1_week',
	},
	{
		value: DashboardtypesTimePreferenceDTO.last_1_month,
		labelKey: 'dashboard_page_v2.panel_config.visualization.last_1_month',
	},
];
