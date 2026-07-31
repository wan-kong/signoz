import {
	DashboardtypesComparisonOperatorDTO,
	DashboardtypesThresholdFormatDTO,
} from 'api/generated/services/sigNoz.schemas';

import type { ConfigSelectItem } from '../../controls/ConfigSelect/ConfigSelect';

type ThresholdOption = Omit<ConfigSelectItem, 'label'> & { labelKey: string };

// Comparison operators offered in the "If value is" condition picker. Labels pair a
// word with its math symbol so the dropdown reads clearly while the view row can show
// the compact symbol (OPERATOR_SYMBOL below).
export const OPERATOR_OPTIONS: ThresholdOption[] = [
	{
		value: DashboardtypesComparisonOperatorDTO.above,
		labelKey: 'dashboard_page_v2.panel_config.thresholds.operators.above',
	},
	{
		value: DashboardtypesComparisonOperatorDTO.above_or_equal,
		labelKey:
			'dashboard_page_v2.panel_config.thresholds.operators.above_or_equal',
	},
	{
		value: DashboardtypesComparisonOperatorDTO.below,
		labelKey: 'dashboard_page_v2.panel_config.thresholds.operators.below',
	},
	{
		value: DashboardtypesComparisonOperatorDTO.below_or_equal,
		labelKey:
			'dashboard_page_v2.panel_config.thresholds.operators.below_or_equal',
	},
	{
		value: DashboardtypesComparisonOperatorDTO.equal,
		labelKey: 'dashboard_page_v2.panel_config.thresholds.operators.equal',
	},
	{
		value: DashboardtypesComparisonOperatorDTO.not_equal,
		labelKey: 'dashboard_page_v2.panel_config.thresholds.operators.not_equal',
	},
];

// Compact symbol shown in the collapsed (view-mode) summary row.
export const OPERATOR_SYMBOL: Record<
	DashboardtypesComparisonOperatorDTO,
	string
> = {
	[DashboardtypesComparisonOperatorDTO.above]: '>',
	[DashboardtypesComparisonOperatorDTO.above_or_equal]: '≥',
	[DashboardtypesComparisonOperatorDTO.below]: '<',
	[DashboardtypesComparisonOperatorDTO.below_or_equal]: '≤',
	[DashboardtypesComparisonOperatorDTO.equal]: '=',
	[DashboardtypesComparisonOperatorDTO.not_equal]: '≠',
};

// How the threshold recolors the panel: just the number ("text") or the whole tile
// ("background").
export const FORMAT_OPTIONS: ThresholdOption[] = [
	{
		value: DashboardtypesThresholdFormatDTO.background,
		labelKey: 'dashboard_page_v2.panel_config.thresholds.formats.background',
	},
	{
		value: DashboardtypesThresholdFormatDTO.text,
		labelKey: 'dashboard_page_v2.panel_config.thresholds.formats.text',
	},
];
