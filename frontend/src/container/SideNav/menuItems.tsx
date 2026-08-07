import i18n from 'ReactI18';
import { MenuProps } from 'antd';
import ROUTES from 'constants/routes';
import {
	ArrowUpRight,
	BarChart,
	BellDot,
	Book,
	Bot,
	Boxes,
	Bug,
	Building2,
	ChartArea,
	Cloudy,
	DraftingCompass,
	FileKey2,
	Github,
	HardDrive,
	Home,
	Keyboard,
	Layers2,
	LayoutGrid,
	ListMinus,
	LogOut,
	MessageSquareText,
	Plus,
	Receipt,
	Rocket,
	Route,
	ScrollText,
	Settings,
	Shield,
	Slack,
	Sparkles,
	Unplug,
	User,
	UserPlus,
	Users,
	Binoculars,
	Brain,
} from '@signozhq/icons';

import {
	SecondaryMenuItemKey,
	SettingsNavSection,
	SidebarItem,
} from './sideNav.types';
import { Style } from '@signozhq/design-tokens';
import Noz from 'components/Noz/Noz';
import { NOZ_TOOLTIP_TITLE } from 'components/Noz/Noz.constants';

export const getStartedMenuItem = {
	key: ROUTES.GET_STARTED_WITH_CLOUD,
	label: 'nav.get_started',
	icon: <Rocket size={16} style={{ transform: 'rotate(45deg)' }} />,
};

export const homeMenuItem = {
	key: ROUTES.HOME,
	label: 'nav.home',
	icon: <Home size={16} />,
};

export const inviteMemberMenuItem = {
	key: `${ROUTES.MEMBERS_SETTINGS}?invite=true`,
	label: 'nav.invite_team_member',
	icon: <UserPlus size={16} />,
};

export const manageLicenseMenuItem = {
	key: ROUTES.LIST_LICENSES,
	label: 'nav.manage_licenses',
	icon: <FileKey2 size={16} />,
};

export const helpSupportMenuItem = {
	key: ROUTES.SUPPORT,
	label: 'nav.help_support',
	icon: <MessageSquareText size={16} />,
};

// The AI Assistant route is parameterized as `/ai-assistant/:conversationId`.
// Sending the user to `/ai-assistant/new` triggers the page's fallback that
// spawns a fresh conversation and replaces the URL with the real id, so
// every sidenav click starts a new chat (the in-page history sidebar lets
// the user resume earlier ones). Using a stable concrete path also lets
// the active-highlight map below resolve `/ai-assistant/<any id>` back to
// this menu key.
const AI_ASSISTANT_NAV_KEY = '/ai-assistant/new';

export const aiAssistantMenuItem = {
	key: AI_ASSISTANT_NAV_KEY,
	label: 'nav.noz',
	icon: <Noz size={16} />,
	itemKey: 'ai-assistant',
	isEarlyAccess: true,
	tooltip: NOZ_TOOLTIP_TITLE,
};

export const shortcutMenuItem = {
	key: ROUTES.SHORTCUTS,
	label: 'nav.keyboard_shortcuts',
	icon: <Layers2 size={16} />,
};

export const slackSupportMenuItem = {
	key: SecondaryMenuItemKey.Slack,
	label: 'nav.slack_support',
	icon: <Slack size={16} />,
};

export const trySignozCloudMenuItem: SidebarItem = {
	key: 'trySignozCloud',
	label: 'nav.try_signoz_cloud',
	icon: <Cloudy size={16} />,
};

const menuItems: SidebarItem[] = [
	{
		key: ROUTES.HOME,
		label: 'nav.home',
		icon: <Home size={16} />,
		itemKey: 'home',
	},
	{
		key: ROUTES.APPLICATION,
		label: 'nav.services',
		icon: <HardDrive size={16} />,
		itemKey: 'services',
	},

	{
		key: ROUTES.LOGS,
		label: 'nav.logs',
		icon: <ScrollText size={16} />,
		itemKey: 'logs',
	},
	{
		key: ROUTES.METRICS_EXPLORER,
		label: 'nav.metrics',
		icon: <BarChart size={16} />,
		isNew: false,
		itemKey: 'metrics',
	},
	{
		key: ROUTES.INFRASTRUCTURE_MONITORING_HOSTS,
		label: 'nav.infra_monitoring',
		icon: <Boxes size={16} />,
		itemKey: 'infrastructure',
	},
	{
		key: ROUTES.ALL_DASHBOARD,
		label: 'nav.dashboards',
		icon: <LayoutGrid size={16} />,
		itemKey: 'dashboards',
	},
	{
		key: ROUTES.MESSAGING_QUEUES_OVERVIEW,
		label: 'nav.messaging_queues',
		icon: <ListMinus size={16} />,
		itemKey: 'messaging-queues',
	},
	{
		key: ROUTES.API_MONITORING,
		label: 'nav.external_apis',
		icon: <Binoculars size={16} />,
		isNew: true,
		itemKey: 'external-apis',
	},
	{
		key: ROUTES.LIST_ALL_ALERT,
		label: 'nav.alerts',
		icon: <BellDot size={16} />,
		itemKey: 'alerts',
	},
	{
		key: ROUTES.INTEGRATIONS,
		label: 'nav.integrations',
		icon: <Unplug size={16} />,
		itemKey: 'integrations',
	},
	{
		key: ROUTES.ALL_ERROR,
		label: 'nav.exceptions',
		icon: <Bug size={16} />,
		itemKey: 'exceptions',
	},
	{
		key: ROUTES.SERVICE_MAP,
		label: 'nav.service_map',
		icon: <Route size={16} />,
		isBeta: true,
		itemKey: 'service-map',
	},
	{
		key: ROUTES.BILLING,
		label: 'nav.billing',
		icon: <Receipt size={16} />,
		itemKey: 'billing',
	},
	{
		key: ROUTES.SETTINGS,
		label: 'nav.settings',
		icon: <Settings size={16} />,
		itemKey: 'settings',
	},
];

export const primaryMenuItems: SidebarItem[] = [
	{
		key: ROUTES.HOME,
		label: 'nav.home',
		icon: <Home size={16} />,
		itemKey: 'home',
	},
	{
		key: ROUTES.LIST_ALL_ALERT,
		label: 'nav.alerts',
		icon: <BellDot size={16} />,
		itemKey: 'alerts',
	},
	{
		key: ROUTES.ALL_DASHBOARD,
		label: 'nav.dashboards',
		icon: <LayoutGrid size={16} />,
		itemKey: 'dashboards',
	},
];

export const defaultMoreMenuItems: SidebarItem[] = [
	{
		key: ROUTES.APPLICATION,
		label: 'nav.services',
		icon: <HardDrive size={16} />,
		isPinned: true,
		isEnabled: true,
		itemKey: 'services',
	},
	{
		key: ROUTES.LOGS,
		label: 'nav.logs',
		icon: <ScrollText size={16} />,
		isPinned: true,
		isEnabled: true,
		itemKey: 'logs',
	},
	{
		key: ROUTES.TRACES_EXPLORER,
		label: 'nav.traces',
		icon: <DraftingCompass size={16} />,
		isPinned: true,
		isEnabled: true,
		itemKey: 'traces',
	},
	{
		key: ROUTES.METRICS_EXPLORER,
		label: 'nav.metrics',
		icon: <BarChart size={16} />,
		isNew: false,
		isEnabled: true,
		itemKey: 'metrics',
	},
	{
		key: ROUTES.INFRASTRUCTURE_MONITORING_HOSTS,
		label: 'nav.infrastructure',
		icon: <Boxes size={16} />,
		isPinned: true,
		isEnabled: true,
		itemKey: 'infrastructure',
	},
	{
		key: ROUTES.INTEGRATIONS,
		label: 'nav.integrations',
		icon: <Unplug size={16} />,
		isEnabled: true,
		itemKey: 'integrations',
	},
	{
		key: ROUTES.ALL_ERROR,
		label: 'nav.exceptions',
		icon: <Bug size={16} />,
		isEnabled: true,
		itemKey: 'exceptions',
	},
	{
		key: ROUTES.API_MONITORING,
		label: 'nav.external_apis',
		icon: <Binoculars size={16} />,
		isNew: true,
		isEnabled: true,
		itemKey: 'external-apis',
	},
	{
		key: ROUTES.AI_OBSERVABILITY_OVERVIEW,
		label: 'nav.ai_observability',
		icon: <Brain size={16} />,
		isNew: true,
		// Gated behind the `enable_ai_observability` feature flag in
		// SideNav's `computedSecondaryMenuItems`; disabled by default.
		isEnabled: false,
		itemKey: 'ai-observability',
	},
	{
		key: ROUTES.METER,
		label: 'nav.cost_meter',
		icon: <ChartArea size={16} />,
		isNew: false,
		isEnabled: true,
		isBeta: false,
		itemKey: 'meter-explorer',
	},
	{
		key: ROUTES.MESSAGING_QUEUES_OVERVIEW,
		label: 'nav.messaging_queues',
		icon: <ListMinus size={16} />,
		isEnabled: true,
		itemKey: 'messaging-queues',
	},
	{
		key: ROUTES.SERVICE_MAP,
		label: 'nav.service_map',
		icon: <Route size={16} />,
		isEnabled: true,
		itemKey: 'service-map',
	},
];

export const settingsNavSections: SettingsNavSection[] = [
	{
		key: 'general',
		items: [
			{
				key: ROUTES.SETTINGS,
				label: 'nav.workspace',
				icon: <Settings size={16} />,
				isEnabled: true,
				itemKey: 'workspace',
			},
			{
				key: ROUTES.MY_SETTINGS,
				label: 'nav.account',
				icon: <User size={16} />,
				isEnabled: true,
				itemKey: 'account',
			},
			// TODO(@SigNoz/pulse-frontend): https://github.com/SigNoz/engineering-pod/issues/5323
			{
				key: ROUTES.ALL_CHANNELS,
				label: 'nav.notification_channels',
				icon: <FileKey2 size={16} />,
				isEnabled: true,
				itemKey: 'notification-channels',
			},
			{
				key: ROUTES.BILLING,
				label: 'nav.billing',
				icon: <Receipt size={16} />,
				isEnabled: false,
				itemKey: 'billing',
			},
			{
				key: ROUTES.INTEGRATIONS,
				label: 'nav.integrations',
				icon: <Unplug size={16} />,
				isEnabled: false,
				itemKey: 'integrations',
			},
			{
				key: ROUTES.MCP_SERVER,
				label: 'nav.mcp_server',
				icon: <Sparkles size={16} />,
				isEnabled: false,
				itemKey: 'mcp-server',
			},
		],
	},

	{
		key: 'identity-access',
		title: 'nav.identity_access',
		items: [
			{
				key: ROUTES.ROLES_SETTINGS,
				label: 'nav.roles',
				icon: <Shield size={16} />,
				isEnabled: false,
				itemKey: 'roles',
				isBeta: true,
			},
			{
				key: ROUTES.MEMBERS_SETTINGS,
				label: 'nav.members',
				icon: <Users size={16} />,
				isEnabled: false,
				itemKey: 'members',
			},
			{
				key: ROUTES.SERVICE_ACCOUNTS_SETTINGS,
				label: 'nav.service_accounts',
				icon: <Bot size={16} />,
				isEnabled: false,
				itemKey: 'service-accounts',
			},
			{
				key: ROUTES.INGESTION_SETTINGS,
				label: 'nav.ingestion',
				icon: <Rocket size={16} style={{ transform: 'rotate(45deg)' }} />,
				isEnabled: false,
				itemKey: 'ingestion',
			},
		],
	},
	{
		key: 'authentication',
		title: 'nav.authentication',
		items: [
			{
				key: ROUTES.ORG_SETTINGS,
				label: 'nav.single_sign_on',
				icon: <User size={16} />,
				isEnabled: false,
				itemKey: 'sso',
			},
		],
	},
	{
		key: 'shortcuts',
		hasDivider: true,
		items: [
			{
				key: ROUTES.SHORTCUTS,
				label: 'nav.keyboard_shortcuts',
				icon: <Keyboard size={16} />,
				isEnabled: true,
				itemKey: 'keyboard-shortcuts',
			},
		],
	},
];

export const helpSupportDropdownMenuItems: SidebarItem[] = [
	{
		key: 'documentation',
		label: (
			<div className="nav-item-label-container">
				<span>
					{String(i18n.t('nav.documentation', 'Documentation', { ns: 'common' }))}
				</span>
				<ArrowUpRight size={14} />
			</div>
		),
		labelKey: 'nav.documentation',
		icon: <Book size={14} />,
		isExternal: true,
		url: 'https://signoz.io/docs',
		itemKey: 'documentation',
	},
	{
		key: 'github',
		label: (
			<div className="nav-item-label-container">
				<span>{String(i18n.t('nav.github', 'GitHub', { ns: 'common' }))}</span>
				<ArrowUpRight size={14} />
			</div>
		),
		labelKey: 'nav.github',

		icon: <Github size={14} />,
		isExternal: true,
		url: 'https://github.com/signoz/signoz',
		itemKey: 'github',
	},
	{
		key: 'slack',
		label: (
			<div className="nav-item-label-container">
				<span>
					{String(
						i18n.t('nav.community_slack', 'Community Slack', { ns: 'common' }),
					)}
				</span>
				<ArrowUpRight size={14} />
			</div>
		),
		labelKey: 'nav.community_slack',
		icon: <Slack size={14} />,
		isExternal: true,
		url: 'https://signoz.io/slack',
		itemKey: 'community-slack',
	},
	{
		key: 'chat-support',
		label: 'nav.chat_support',
		icon: <MessageSquareText size={14} />,
		itemKey: 'chat-support',
	},
	{
		key: 'invite-collaborators',
		label: 'nav.invite_team_member',
		icon: <Plus size={14} />,
		itemKey: 'invite-collaborators',
	},
];

export interface UserSettingsMenuItemsParams {
	userEmail: string;
	isWorkspaceBlocked: boolean;
	isEnterpriseSelfHostedUser: boolean;
	isCommunityEnterpriseUser: boolean;
}

export const getUserSettingsDropdownMenuItems = ({
	userEmail,
	isWorkspaceBlocked,
	isEnterpriseSelfHostedUser,
	isCommunityEnterpriseUser,
}: UserSettingsMenuItemsParams): MenuProps['items'] =>
	[
		{
			key: 'label',
			label: (
				<div className="user-settings-dropdown-logged-in-section">
					<span className="user-settings-dropdown-label-text">
						{String(
							i18n.t('side_nav.logged_in_as', 'LOGGED IN AS', { ns: 'common' }),
						)}
					</span>
					<span className="user-settings-dropdown-label-email">{userEmail}</span>
				</div>
			),
			disabled: true,
			dataTestId: 'logged-in-as-nav-item',
		},
		{ type: 'divider' as const },
		{
			key: 'workspace',
			label: 'nav.workspace_settings',
			icon: <Building2 size={14} color={Style.L1_FOREGROUND} />,
			disabled: isWorkspaceBlocked,
			dataTestId: 'workspace-settings-nav-item',
		},
		{
			key: 'account',
			label: 'nav.account_settings',
			icon: <User size={14} color={Style.L1_FOREGROUND} />,
			dataTestId: 'account-settings-nav-item',
		},
		...(isEnterpriseSelfHostedUser || isCommunityEnterpriseUser
			? [
					{
						key: 'license',
						label: 'nav.manage_license',
						icon: <Shield size={14} color={Style.L1_FOREGROUND} />,
						dataTestId: 'manage-license-nav-item',
					},
				]
			: []),
		{
			key: 'keyboard-shortcuts',
			label: 'nav.keyboard_shortcuts',
			icon: <Keyboard size={14} color={Style.L1_FOREGROUND} />,
			dataTestId: 'keyboard-shortcuts-nav-item',
		},
		{ type: 'divider' as const },
		{
			key: 'logout',
			label: (
				<span className="user-settings-dropdown-logout-section">
					{String(i18n.t('side_nav.sign_out', 'Sign out', { ns: 'common' }))}
				</span>
			),
			icon: (
				<LogOut
					size={14}
					className="user-settings-dropdown-logout-section"
					color={Style.DANGER_BACKGROUND}
				/>
			),
			dataTestId: 'logout-nav-item',
		},
	].filter(Boolean);

/** Mapping of some newly added routes and their corresponding active sidebar menu key
    This is used to highlight the correct menu item when the user navigates to a new route
**/
export const NEW_ROUTES_MENU_ITEM_KEY_MAP: Record<string, string> = {
	[ROUTES.TRACE]: ROUTES.TRACES_EXPLORER,
	[ROUTES.TRACE_EXPLORER]: ROUTES.TRACES_EXPLORER,
	[ROUTES.LOGS_BASE]: ROUTES.LOGS_EXPLORER,
	[ROUTES.METRICS_EXPLORER_BASE]: ROUTES.METRICS_EXPLORER,
	[ROUTES.INFRASTRUCTURE_MONITORING_BASE]:
		ROUTES.INFRASTRUCTURE_MONITORING_HOSTS,
	[ROUTES.API_MONITORING_BASE]: ROUTES.API_MONITORING,
	[ROUTES.MESSAGING_QUEUES_BASE]: ROUTES.MESSAGING_QUEUES_OVERVIEW,
	[ROUTES.AI_OBSERVABILITY_BASE]: ROUTES.AI_OBSERVABILITY_OVERVIEW,
	// `getActiveMenuKeyFromPath` strips the URL down to its first segment;
	// `/ai-assistant/<id>` reduces to `/ai-assistant`, which we point back
	// to the AI Assistant menu item's concrete key.
	'/ai-assistant': AI_ASSISTANT_NAV_KEY,
};

export default menuItems;
