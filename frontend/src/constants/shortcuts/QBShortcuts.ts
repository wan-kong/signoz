import i18n from 'ReactI18';
import { getUserOperatingSystem, UserOperatingSystem } from 'utils/getUserOS';

const userOS = getUserOperatingSystem();

export const QBShortcuts = {
	StageAndRunQuery: 'enter+meta',
};

export const QBShortcutsName = {
	StageAndRunQuery: `${
		userOS === UserOperatingSystem.MACOS ? 'cmd' : 'ctrl'
	}+enter`,
};

export const QBShortcutsDescription = {
	StageAndRunQuery: i18n.t(
		'qb_shortcuts.stage_and_run_query',
		'Stage and Run the current query',
		{ ns: 'shortcuts' },
	),
};
