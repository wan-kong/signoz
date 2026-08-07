import i18n from 'ReactI18';
export const GlobalShortcuts = {
	NavigateToServices: 'shift+s',
	NavigateToDashboards: 'shift+d',
	NavigateToAlerts: 'shift+a',
	NavigateToExceptions: 'shift+e',
	NavigateToMessagingQueues: 'shift+q',
	ToggleSidebar: 'shift+b',
	NavigateToHome: 'shift+h',

	// logs
	NavigateToLogs: 'shift+l',
	NavigateToLogsPipelines: 'shift+l+p',
	NavigateToLogsViews: 'shift+l+v',

	// traces
	NavigateToTraces: 'shift+t',
	NavigateToTracesFunnel: 'shift+t+f',
	NavigateToTracesViews: 'shift+t+v',

	// metrics
	NavigateToMetricsSummary: 'shift+m',
	NavigateToMetricsExplorer: 'shift+m+e',
	NavigateToMetricsViews: 'shift+m+v',

	// settings
	NavigateToSettings: 'shift+g',
	NavigateToSettingsIngestion: 'shift+g+i',
	NavigateToSettingsBilling: 'shift+g+b',
	NavigateToSettingsNotificationChannels: 'shift+g+n',
	NavigateToSettingsServiceAccounts: 'shift+g+k',
	NavigateToSettingsRoles: 'shift+g+r',
	NavigateToSettingsMembers: 'shift+g+m',
};

export const GlobalShortcutsName = {
	NavigateToServices: 'shift+s',
	NavigateToTraces: 'shift+t',
	NavigateToDashboards: 'shift+d',
	NavigateToAlerts: 'shift+a',
	NavigateToExceptions: 'shift+e',
	NavigateToMessagingQueues: 'shift+q',
	ToggleSidebar: 'shift+b',
	NavigateToHome: 'shift+h',
	NavigateToTracesFunnel: 'shift+t+f',
	NavigateToTracesViews: 'shift+t+v',
	NavigateToMetricsSummary: 'shift+m',
	NavigateToMetricsExplorer: 'shift+m+e',
	NavigateToMetricsViews: 'shift+m+v',
	NavigateToSettings: 'shift+g',
	NavigateToSettingsIngestion: 'shift+g+i',
	NavigateToSettingsBilling: 'shift+g+b',
	NavigateToSettingsNotificationChannels: 'shift+g+n',
	NavigateToSettingsServiceAccounts: 'shift+g+k',
	NavigateToSettingsRoles: 'shift+g+r',
	NavigateToSettingsMembers: 'shift+g+m',
	NavigateToLogs: 'shift+l',
	NavigateToLogsPipelines: 'shift+l+p',
	NavigateToLogsViews: 'shift+l+v',
};

export const GlobalShortcutsDescription = {
	NavigateToHome: i18n.t(
		'global_shortcuts.navigate_to_home',
		'Navigate to Home',
		{
			ns: 'shortcuts',
		},
	),
	NavigateToServices: i18n.t(
		'global_shortcuts.navigate_to_services',
		'Navigate to Services page',
		{ ns: 'shortcuts' },
	),
	NavigateToTraces: i18n.t(
		'global_shortcuts.navigate_to_traces',
		'Navigate to Traces Explorer',
		{ ns: 'shortcuts' },
	),
	NavigateToLogs: i18n.t(
		'global_shortcuts.navigate_to_logs',
		'Navigate to Logs Explorer',
		{ ns: 'shortcuts' },
	),
	NavigateToDashboards: i18n.t(
		'global_shortcuts.navigate_to_dashboards',
		'Navigate to Dashboards List',
		{ ns: 'shortcuts' },
	),
	NavigateToAlerts: i18n.t(
		'global_shortcuts.navigate_to_alerts',
		'Navigate to Alerts List',
		{ ns: 'shortcuts' },
	),
	NavigateToExceptions: i18n.t(
		'global_shortcuts.navigate_to_exceptions',
		'Navigate to Exceptions List',
		{ ns: 'shortcuts' },
	),
	NavigateToMessagingQueues: i18n.t(
		'global_shortcuts.navigate_to_messaging_queues',
		'Navigate to Messaging Queues',
		{ ns: 'shortcuts' },
	),
	ToggleSidebar: i18n.t(
		'global_shortcuts.toggle_sidebar',
		'Toggle sidebar visibility',
		{ ns: 'shortcuts' },
	),
	NavigateToTracesFunnel: i18n.t(
		'global_shortcuts.navigate_to_traces_funnel',
		'Navigate to Traces Funnel',
		{ ns: 'shortcuts' },
	),
	NavigateToTracesViews: i18n.t(
		'global_shortcuts.navigate_to_traces_views',
		'Navigate to Traces Views',
		{ ns: 'shortcuts' },
	),
	NavigateToMetricsSummary: i18n.t(
		'global_shortcuts.navigate_to_metrics_summary',
		'Navigate to Metrics Summary',
		{ ns: 'shortcuts' },
	),
	NavigateToMetricsExplorer: i18n.t(
		'global_shortcuts.navigate_to_metrics_explorer',
		'Navigate to Metrics Explorer',
		{ ns: 'shortcuts' },
	),
	NavigateToMetricsViews: i18n.t(
		'global_shortcuts.navigate_to_metrics_views',
		'Navigate to Metrics Views',
		{ ns: 'shortcuts' },
	),
	NavigateToSettings: i18n.t(
		'global_shortcuts.navigate_to_settings',
		'Navigate to Settings',
		{ ns: 'shortcuts' },
	),
	NavigateToSettingsIngestion: i18n.t(
		'global_shortcuts.navigate_to_settings_ingestion',
		'Navigate to Ingestion Settings',
		{ ns: 'shortcuts' },
	),
	NavigateToSettingsBilling: i18n.t(
		'global_shortcuts.navigate_to_settings_billing',
		'Navigate to Billing Settings',
		{ ns: 'shortcuts' },
	),
	NavigateToSettingsNotificationChannels: i18n.t(
		'global_shortcuts.navigate_to_settings_notification_channels',
		'Navigate to Notification Channels Settings',
		{ ns: 'shortcuts' },
	),
	NavigateToLogsPipelines: i18n.t(
		'global_shortcuts.navigate_to_logs_pipelines',
		'Navigate to Logs Pipelines',
		{ ns: 'shortcuts' },
	),
	NavigateToLogsViews: i18n.t(
		'global_shortcuts.navigate_to_logs_views',
		'Navigate to Logs Views',
		{ ns: 'shortcuts' },
	),
	NavigateToSettingsServiceAccounts: i18n.t(
		'global_shortcuts.navigate_to_settings_service_accounts',
		'Navigate to Service Accounts Settings',
		{ ns: 'shortcuts' },
	),
	NavigateToSettingsRoles: i18n.t(
		'global_shortcuts.navigate_to_settings_roles',
		'Navigate to Roles Settings',
		{ ns: 'shortcuts' },
	),
	NavigateToSettingsMembers: i18n.t(
		'global_shortcuts.navigate_to_settings_members',
		'Navigate to Members Settings',
		{ ns: 'shortcuts' },
	),
};
