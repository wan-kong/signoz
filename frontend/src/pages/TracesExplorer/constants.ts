export interface ToolbarViewConfig {
	name: string;
	label: string;
	show: boolean;
	key: string;
	disabled?: boolean;
}

export const TOOLBAR_VIEWS: Record<string, ToolbarViewConfig> = {
	list: {
		name: 'list',
		label: 'view_modes.list',
		show: true,
		key: 'list',
	},
	timeseries: {
		name: 'timeseries',
		label: 'view_modes.timeseries',
		disabled: false,
		show: true,
		key: 'timeseries',
	},
	trace: {
		name: 'trace',
		label: 'view_modes.trace',
		disabled: false,
		show: true,
		key: 'trace',
	},
	table: {
		name: 'table',
		label: 'view_modes.table',
		disabled: false,
		show: true,
		key: 'table',
	},
	clickhouse: {
		name: 'clickhouse',
		label: 'view_modes.clickhouse',
		disabled: false,
		show: false,
		key: 'clickhouse',
	},
};
