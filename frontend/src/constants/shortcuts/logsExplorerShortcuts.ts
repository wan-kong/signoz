import i18n from 'ReactI18';
import { getUserOperatingSystem, UserOperatingSystem } from 'utils/getUserOS';

const userOS = getUserOperatingSystem();
export const LogsExplorerShortcuts = {
	StageAndRunQuery: 'enter+meta',
	FocusTheSearchBar: 's',
	ShowAllFilters: '/+meta',
};

export const LogsExplorerShortcutsName = {
	StageAndRunQuery: `${
		userOS === UserOperatingSystem.MACOS ? 'cmd' : 'ctrl'
	} + enter`,
	FocusTheSearchBar: 's',
	ShowAllFilters: `${userOS === UserOperatingSystem.MACOS ? 'cmd' : 'ctrl'} + /`,
};

export const LogsExplorerShortcutsDescription = {
	StageAndRunQuery: i18n.t(
		'logs_shortcuts.stage_and_run_query',
		'Stage and Run the current query',
		{ ns: 'shortcuts' },
	),
	FocusTheSearchBar: i18n.t(
		'logs_shortcuts.focus_the_search_bar',
		'Shift the focus to the last query filter bar',
		{ ns: 'shortcuts' },
	),
	ShowAllFilters: i18n.t(
		'logs_shortcuts.show_all_filters',
		'Toggle all filters in the filters dropdown',
		{ ns: 'shortcuts' },
	),
};
