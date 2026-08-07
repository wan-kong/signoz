import { TableProps } from 'antd';
import i18n from 'ReactI18';
import {
	DashboardShortcuts,
	DashboardShortcutsDescription,
	DashboardShortcutsName,
} from 'constants/shortcuts/DashboardShortcuts';
import {
	GlobalShortcuts,
	GlobalShortcutsDescription,
	GlobalShortcutsName,
} from 'constants/shortcuts/globalShortcuts';
import {
	LogsExplorerShortcuts,
	LogsExplorerShortcutsDescription,
	LogsExplorerShortcutsName,
} from 'constants/shortcuts/logsExplorerShortcuts';
import {
	QBShortcuts,
	QBShortcutsDescription,
	QBShortcutsName,
} from 'constants/shortcuts/QBShortcuts';

export const ALL_SHORTCUTS: Record<string, Record<string, string>> = {
	[i18n.t('shortcuts_extra.global', 'Global Shortcuts', { ns: 'common' })]:
		GlobalShortcuts,
	[i18n.t('shortcuts_extra.logs_explorer', 'Logs Explorer Shortcuts', {
		ns: 'common',
	})]: LogsExplorerShortcuts,
	[i18n.t('shortcuts_extra.query_builder', 'Query Builder Shortcuts', {
		ns: 'common',
	})]: QBShortcuts,
	[i18n.t('shortcuts_extra.dashboard', 'Dashboard Shortcuts', {
		ns: 'common',
	})]: DashboardShortcuts,
};

export const ALL_SHORTCUTS_LABEL: Record<string, Record<string, string>> = {
	[i18n.t('shortcuts_extra.global', 'Global Shortcuts', { ns: 'common' })]:
		GlobalShortcutsName,
	[i18n.t('shortcuts_extra.logs_explorer', 'Logs Explorer Shortcuts', {
		ns: 'common',
	})]: LogsExplorerShortcutsName,
	[i18n.t('shortcuts_extra.query_builder', 'Query Builder Shortcuts', {
		ns: 'common',
	})]: QBShortcutsName,
	[i18n.t('shortcuts_extra.dashboard', 'Dashboard Shortcuts', {
		ns: 'common',
	})]: DashboardShortcutsName,
};

export const ALL_SHORTCUTS_DESCRIPTION: Record<
	string,
	Record<string, string>
> = {
	[i18n.t('shortcuts_extra.global', 'Global Shortcuts', { ns: 'common' })]:
		GlobalShortcutsDescription,
	[i18n.t('shortcuts_extra.logs_explorer', 'Logs Explorer Shortcuts', {
		ns: 'common',
	})]: LogsExplorerShortcutsDescription,
	[i18n.t('shortcuts_extra.query_builder', 'Query Builder Shortcuts', {
		ns: 'common',
	})]: QBShortcutsDescription,
	[i18n.t('shortcuts_extra.dashboard', 'Dashboard Shortcuts', {
		ns: 'common',
	})]: DashboardShortcutsDescription,
};

export const shortcutColumns = [
	{
		title: i18n.t('shortcuts_extra.keyboard_shortcut', 'Keyboard Shortcut', {
			ns: 'common',
		}),
		dataIndex: 'shortcutKey',
		key: 'shortcutKey',
		width: '30%',
		className: 'shortcut-key',
	},
	{
		title: i18n.t('shortcuts_extra.description', 'Description', {
			ns: 'common',
		}),
		dataIndex: 'shortcutDescription',
		key: 'shortcutDescription',
		className: 'shortcut-description',
	},
];

interface ShortcutRow {
	shortcutKey: string;
	shortcutDescription: string;
}

export function generateTableData(
	shortcutSection: string,
): TableProps<ShortcutRow>['dataSource'] {
	const shortcuts = ALL_SHORTCUTS[shortcutSection];
	const shortcutsDescription = ALL_SHORTCUTS_DESCRIPTION[shortcutSection];
	const shortcutsLabel = ALL_SHORTCUTS_LABEL[shortcutSection];
	return Object.keys(shortcuts).map((shortcutName) => ({
		key: `${shortcuts[shortcutName]} ${shortcutName}`,
		shortcutKey: shortcutsLabel[shortcutName],
		shortcutDescription: shortcutsDescription[shortcutName],
	}));
}
