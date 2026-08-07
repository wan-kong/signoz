import i18n from 'ReactI18';
import React from 'react';
import ROUTES from 'constants/routes';
import { GlobalShortcutsName } from 'constants/shortcuts/globalShortcuts';
import { THEME_MODE } from 'hooks/useDarkMode/constant';
import {
	BarChart,
	BellDot,
	Bug,
	Compass,
	DraftingCompass,
	Expand,
	HardDrive,
	Home,
	LayoutGrid,
	ListMinus,
	ScrollText,
	Settings,
	TowerControl,
	Workflow,
} from '@signozhq/icons';
import Noz from 'components/Noz/Noz';
import { ROLES } from 'types/roles';

export type CmdAction = {
	id: string;
	name: string;
	shortcut?: string[];
	keywords?: string;
	section?: string;
	icon?: React.ReactNode;
	roles?: ROLES[];
	perform: () => void;
};

type ActionDeps = {
	navigate: (path: string) => void;
	handleThemeChange: (mode: string) => void;
	/**
	 * Provided only when the AI Assistant feature is available for the current
	 * tenant. When present, the palette surfaces an "Open AI Assistant" entry
	 * at the top; when absent, the action is omitted entirely.
	 */
	aiAssistant?: {
		open: () => void;
	};
	/**
	 * Provided only in development mode. Opens the AuthZ DevTools modal
	 * for testing permission overrides.
	 */
	authzDevTools?: {
		open: () => void;
	};
};

export function createShortcutActions(deps: ActionDeps): CmdAction[] {
	const { navigate, handleThemeChange, aiAssistant, authzDevTools } = deps;

	const actions: CmdAction[] = [
		{
			id: 'home',
			name: i18n.t('shortcut_actions.go_to_home', 'Go to Home', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToHome],
			keywords: 'home',
			section: i18n.t('shortcut_actions.section_navigation', 'Navigation', {
				ns: 'shortcuts',
			}),
			icon: <Home size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.HOME),
		},
		{
			id: 'dashboards',
			name: i18n.t('shortcut_actions.go_to_dashboards', 'Go to Dashboards', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToDashboards],
			keywords: 'dashboards',
			section: i18n.t('shortcut_actions.section_navigation', 'Navigation', {
				ns: 'shortcuts',
			}),
			icon: <LayoutGrid size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.ALL_DASHBOARD),
		},
		{
			id: 'services',
			name: i18n.t('shortcut_actions.go_to_services', 'Go to Services', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToServices],
			keywords: 'services monitoring',
			section: i18n.t('shortcut_actions.section_navigation', 'Navigation', {
				ns: 'shortcuts',
			}),
			icon: <HardDrive size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.APPLICATION),
		},
		{
			id: 'alerts',
			name: i18n.t('shortcut_actions.go_to_alerts', 'Go to Alerts', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToAlerts],
			keywords: 'alerts',
			section: i18n.t('shortcut_actions.section_navigation', 'Navigation', {
				ns: 'shortcuts',
			}),
			icon: <BellDot size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.LIST_ALL_ALERT),
		},
		{
			id: 'exceptions',
			name: i18n.t('shortcut_actions.go_to_exceptions', 'Go to Exceptions', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToExceptions],
			keywords: 'exceptions errors',
			section: i18n.t('shortcut_actions.section_navigation', 'Navigation', {
				ns: 'shortcuts',
			}),
			icon: <Bug size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.ALL_ERROR),
		},
		{
			id: 'messaging-queues',
			name: i18n.t(
				'shortcut_actions.go_to_messaging_queues',
				'Go to Messaging Queues',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToMessagingQueues],
			keywords: 'messaging queues mq',
			section: i18n.t('shortcut_actions.section_navigation', 'Navigation', {
				ns: 'shortcuts',
			}),
			icon: <ListMinus size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.MESSAGING_QUEUES_OVERVIEW),
		},

		// logs
		{
			id: 'logs',
			name: i18n.t('shortcut_actions.go_to_logs', 'Go to Logs', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToLogs],
			keywords: 'logs',
			section: i18n.t('shortcut_actions.section_logs', 'Logs', {
				ns: 'shortcuts',
			}),
			icon: <ScrollText size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.LOGS),
		},
		{
			id: 'logs',
			name: i18n.t(
				'shortcut_actions.go_to_logs_pipelines',
				'Go to Logs Pipelines',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToLogsPipelines],
			keywords: 'logs pipelines',
			section: i18n.t('shortcut_actions.section_logs', 'Logs', {
				ns: 'shortcuts',
			}),
			icon: <Workflow size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.LOGS_PIPELINES),
		},
		{
			id: 'logs',
			name: i18n.t('shortcut_actions.go_to_logs_views', 'Go to Logs Views', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToLogsViews],
			keywords: 'logs views',
			section: i18n.t('shortcut_actions.section_logs', 'Logs', {
				ns: 'shortcuts',
			}),
			icon: <TowerControl size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.LOGS_SAVE_VIEWS),
		},

		// metrics
		{
			id: 'metrics-summary',
			name: i18n.t(
				'shortcut_actions.go_to_metrics_summary',
				'Go to Metrics Summary',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToMetricsSummary],
			keywords: 'metrics summary',
			section: i18n.t('shortcut_actions.section_metrics', 'Metrics', {
				ns: 'shortcuts',
			}),
			icon: <BarChart size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.METRICS_EXPLORER),
		},
		{
			id: 'metrics-explorer',
			name: i18n.t(
				'shortcut_actions.go_to_metrics_explorer',
				'Go to Metrics Explorer',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToMetricsExplorer],
			keywords: 'metrics explorer',
			section: i18n.t('shortcut_actions.section_metrics', 'Metrics', {
				ns: 'shortcuts',
			}),
			icon: <Compass size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.METRICS_EXPLORER_EXPLORER),
		},
		{
			id: 'metrics-views',
			name: i18n.t('shortcut_actions.go_to_metrics_views', 'Go to Metrics Views', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToMetricsViews],
			keywords: 'metrics views',
			section: i18n.t('shortcut_actions.section_metrics', 'Metrics', {
				ns: 'shortcuts',
			}),
			icon: <TowerControl size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.METRICS_EXPLORER_VIEWS),
		},

		// Traces
		{
			id: 'traces',
			name: i18n.t('shortcut_actions.go_to_traces', 'Go to Traces', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToTraces],
			keywords: 'traces',
			section: i18n.t('shortcut_actions.section_traces', 'Traces', {
				ns: 'shortcuts',
			}),
			icon: <DraftingCompass size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.TRACES_EXPLORER),
		},
		{
			id: 'traces-funnel',
			name: i18n.t(
				'shortcut_actions.go_to_traces_funnels',
				'Go to Traces Funnels',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToTracesFunnel],
			keywords: 'traces funnel',
			section: i18n.t('shortcut_actions.section_traces', 'Traces', {
				ns: 'shortcuts',
			}),
			icon: <DraftingCompass size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.TRACES_FUNNELS),
		},

		// Common actions
		{
			id: 'dark-mode',
			name: i18n.t('shortcut_actions.switch_to_dark_mode', 'Switch to Dark Mode', {
				ns: 'shortcuts',
			}),
			keywords: 'theme dark mode appearance',
			section: i18n.t('shortcut_actions.section_common', 'Common', {
				ns: 'shortcuts',
			}),
			icon: <Expand size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => handleThemeChange(THEME_MODE.DARK),
		},
		{
			id: 'light-mode',
			name: i18n.t(
				'shortcut_actions.switch_to_light_mode',
				'Switch to Light Mode [Beta]',
				{ ns: 'shortcuts' },
			),
			keywords: 'theme light mode appearance',
			section: i18n.t('shortcut_actions.section_common', 'Common', {
				ns: 'shortcuts',
			}),
			icon: <Expand size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => handleThemeChange(THEME_MODE.LIGHT),
		},
		{
			id: 'system-theme',
			name: i18n.t(
				'shortcut_actions.switch_to_system_theme',
				'Switch to System Theme',
				{ ns: 'shortcuts' },
			),
			keywords: 'system theme appearance',
			section: i18n.t('shortcut_actions.section_common', 'Common', {
				ns: 'shortcuts',
			}),
			icon: <Expand size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => handleThemeChange(THEME_MODE.SYSTEM),
		},

		// settings sub-pages
		{
			id: 'my-settings',
			name: i18n.t(
				'shortcut_actions.go_to_account_settings',
				'Go to Account Settings',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToSettings],
			keywords: 'account settings',
			section: i18n.t('shortcut_actions.section_settings', 'Settings', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: (): void => navigate(ROUTES.MY_SETTINGS),
		},
		{
			id: 'my-settings-ingestion',
			name: i18n.t(
				'shortcut_actions.go_to_account_settings_ingestion',
				'Go to Account Settings Ingestion',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToSettingsIngestion],
			keywords: 'account settings',
			section: i18n.t('shortcut_actions.section_settings', 'Settings', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN', 'EDITOR'],
			perform: (): void => navigate(ROUTES.INGESTION_SETTINGS),
		},

		{
			id: 'my-settings-billing',
			name: i18n.t(
				'shortcut_actions.go_to_account_settings_billing',
				'Go to Account Settings Billing',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToSettingsBilling],
			keywords: 'account settings billing',
			section: i18n.t('shortcut_actions.section_settings', 'Settings', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN', 'EDITOR'],
			perform: (): void => navigate(ROUTES.BILLING),
		},
		{
			id: 'my-settings-service-accounts',
			name: i18n.t(
				'shortcut_actions.go_to_service_accounts',
				'Go to Service Accounts',
				{ ns: 'shortcuts' },
			),
			shortcut: [GlobalShortcutsName.NavigateToSettingsServiceAccounts],
			keywords: 'settings service accounts',
			section: i18n.t('shortcut_actions.section_settings', 'Settings', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN'],
			perform: (): void => navigate(ROUTES.SERVICE_ACCOUNTS_SETTINGS),
		},
		{
			id: 'my-settings-roles',
			name: i18n.t('shortcut_actions.go_to_roles', 'Go to Roles', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToSettingsRoles],
			keywords: 'settings roles',
			section: i18n.t('shortcut_actions.section_settings', 'Settings', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN'],
			perform: (): void => navigate(ROUTES.ROLES_SETTINGS),
		},
		{
			id: 'my-settings-members',
			name: i18n.t('shortcut_actions.go_to_members', 'Go to Members', {
				ns: 'shortcuts',
			}),
			shortcut: [GlobalShortcutsName.NavigateToSettingsMembers],
			keywords: 'settings members',
			section: i18n.t('shortcut_actions.section_settings', 'Settings', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN'],
			perform: (): void => navigate(ROUTES.MEMBERS_SETTINGS),
		},
	];

	if (aiAssistant) {
		actions.unshift({
			id: 'ai-assistant',
			name: i18n.t('shortcut_actions.open_noz', 'Open Noz', {
				ns: 'shortcuts',
			}),
			shortcut: ['cmd+j'],
			keywords: 'noz ai assistant chat ask sparkles copilot',
			section: i18n.t('shortcut_actions.section_noz', 'Noz', {
				ns: 'shortcuts',
			}),
			icon: <Noz size={16} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: aiAssistant.open,
		});
	}

	if (authzDevTools) {
		actions.push({
			id: 'authz-devtools',
			name: i18n.t('shortcut_actions.authz_devtools', 'AuthZ DevTools', {
				ns: 'shortcuts',
			}),
			keywords: 'authz permissions rbac debug devtools override testing',
			section: i18n.t('shortcut_actions.section_dev', 'Dev', {
				ns: 'shortcuts',
			}),
			icon: <Settings size={14} />,
			roles: ['ADMIN', 'EDITOR', 'VIEWER'],
			perform: authzDevTools.open,
		});
	}

	return actions;
}
