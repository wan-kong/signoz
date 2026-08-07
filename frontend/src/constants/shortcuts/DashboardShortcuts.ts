import i18n from 'ReactI18';
import { getUserOperatingSystem, UserOperatingSystem } from 'utils/getUserOS';

const userOS = getUserOperatingSystem();

export const DashboardShortcuts = {
	SaveChanges: 's+meta',
	DiscardChanges: 'd+meta',
};

export const DashboardShortcutsName = {
	SaveChanges: `${userOS === UserOperatingSystem.MACOS ? 'cmd' : 'ctrl'}+s`,
	DiscardChanges: `${userOS === UserOperatingSystem.MACOS ? 'cmd' : 'ctrl'}+d`,
};

export const DashboardShortcutsDescription = {
	SaveChanges: i18n.t(
		'dashboard_shortcuts.save_changes',
		'Save Changes for panel',
		{ ns: 'shortcuts' },
	),
	DiscardChanges: i18n.t(
		'dashboard_shortcuts.discard_changes',
		'Discard Changes for panel',
		{ ns: 'shortcuts' },
	),
};
