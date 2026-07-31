import {
	BarChart,
	ChartLine,
	ChartPie,
	Hash,
	List,
	Table,
} from '@signozhq/icons';

import type { PanelType } from './types';

export const PANEL_TYPES: PanelType[] = [
	{
		panelKind: 'signoz/TimeSeriesPanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.time_series',
		Icon: ChartLine,
	},
	{
		panelKind: 'signoz/NumberPanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.number',
		Icon: Hash,
	},
	{
		panelKind: 'signoz/TablePanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.table',
		Icon: Table,
	},
	{
		panelKind: 'signoz/BarChartPanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.bar_chart',
		Icon: BarChart,
	},
	{
		panelKind: 'signoz/PieChartPanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.pie_chart',
		Icon: ChartPie,
	},
	{
		panelKind: 'signoz/HistogramPanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.histogram',
		Icon: BarChart,
	},
	{
		panelKind: 'signoz/ListPanel',
		labelKey: 'dashboard_page_v2.panel_config.panel_types.list',
		Icon: List,
	},
];
