import { RouteTabProps } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import BillingContainer from 'container/BillingContainer/BillingContainer';
import GeneralSettings from 'container/GeneralSettings';
import GeneralSettingsCloud from 'container/GeneralSettingsCloud';
import IngestionSettings from 'container/IngestionSettings/IngestionSettings';
import MultiIngestionSettings from 'container/IngestionSettings/MultiIngestionSettings';
import MCPServerSettings from 'container/MCPServerSettings/MCPServerSettings';
import MySettings from 'container/MySettings';
import OrganizationSettings from 'container/OrganizationSettings';
import RolesSettings from 'container/RolesSettings';
import CreateEditRolePage from 'container/RolesSettings/CreateEditRolePage';
import ViewRolePage from 'container/RolesSettings/ViewRolePage';
import { useTranslation } from 'react-i18next';
import {
	Backpack,
	Bot,
	Building,
	Cpu,
	CreditCard,
	Keyboard,
	Shield,
	Sparkles,
	User,
	Users,
} from '@signozhq/icons';
import MembersSettings from 'pages/MembersSettings';
import ServiceAccountsSettings from 'pages/ServiceAccountsSettings';
import Shortcuts from 'pages/Shortcuts';

interface SettingsTabLabelProps {
	icon: JSX.Element;
	labelKey: string;
}

function SettingsTabLabel({
	icon,
	labelKey,
}: SettingsTabLabelProps): JSX.Element {
	const { t } = useTranslation('routes');

	return (
		<div className="periscope-tab">
			{icon} {t(labelKey).toString()}
		</div>
	);
}

export const organizationSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: OrganizationSettings,
			name: (
				<SettingsTabLabel
					icon={<Building size={16} />}
					labelKey="routes:organization_settings"
				/>
			),
			route: ROUTES.ORG_SETTINGS,
			key: ROUTES.ORG_SETTINGS,
		},
	];
};

export const ingestionSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: IngestionSettings,
			name: (
				<SettingsTabLabel
					icon={<Cpu size={16} />}
					labelKey="routes:ingestion_settings"
				/>
			),
			route: ROUTES.INGESTION_SETTINGS,
			key: ROUTES.INGESTION_SETTINGS,
		},
	];
};

export const multiIngestionSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: MultiIngestionSettings,
			name: (
				<SettingsTabLabel
					icon={<Cpu size={16} />}
					labelKey="routes:ingestion_settings"
				/>
			),
			route: ROUTES.INGESTION_SETTINGS,
			key: ROUTES.INGESTION_SETTINGS,
		},
	];
};

export const generalSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: GeneralSettings,
			name: (
				<SettingsTabLabel icon={<Backpack size={16} />} labelKey="routes:general" />
			),
			route: ROUTES.SETTINGS,
			key: ROUTES.SETTINGS,
		},
	];
};

export const generalSettingsCloud = (): RouteTabProps['routes'] => {
	return [
		{
			Component: GeneralSettingsCloud,
			name: (
				<SettingsTabLabel icon={<Backpack size={16} />} labelKey="routes:general" />
			),
			route: ROUTES.SETTINGS,
			key: ROUTES.SETTINGS,
		},
	];
};

export const billingSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: BillingContainer,
			name: (
				<SettingsTabLabel
					icon={<CreditCard size={16} />}
					labelKey="routes:billing"
				/>
			),
			route: ROUTES.BILLING,
			key: ROUTES.BILLING,
		},
	];
};

export const membersSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: MembersSettings,
			name: (
				<SettingsTabLabel icon={<Users size={16} />} labelKey="routes:members" />
			),
			route: ROUTES.MEMBERS_SETTINGS,
			key: ROUTES.MEMBERS_SETTINGS,
		},
	];
};

export const rolesSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: RolesSettings,
			name: (
				<SettingsTabLabel icon={<Shield size={16} />} labelKey="routes:roles" />
			),
			route: ROUTES.ROLES_SETTINGS,
			key: ROUTES.ROLES_SETTINGS,
		},
	];
};

export const roleDetails = (): RouteTabProps['routes'] => {
	return [
		{
			Component: ViewRolePage,
			name: (
				<SettingsTabLabel
					icon={<Shield size={16} />}
					labelKey="routes:role_details"
				/>
			),
			route: ROUTES.ROLE_DETAILS,
			key: ROUTES.ROLE_DETAILS,
		},
	];
};

export const roleEdit = (): RouteTabProps['routes'] => {
	return [
		{
			Component: CreateEditRolePage,
			name: (
				<SettingsTabLabel icon={<Shield size={16} />} labelKey="routes:role_edit" />
			),
			route: ROUTES.ROLE_EDIT,
			key: ROUTES.ROLE_EDIT,
		},
	];
};

export const roleCreate = (): RouteTabProps['routes'] => {
	return [
		{
			Component: CreateEditRolePage,
			name: (
				<SettingsTabLabel
					icon={<Shield size={16} />}
					labelKey="routes:role_create"
				/>
			),
			route: ROUTES.ROLE_CREATE,
			key: ROUTES.ROLE_CREATE,
		},
	];
};

export const keyboardShortcuts = (): RouteTabProps['routes'] => {
	return [
		{
			Component: Shortcuts,
			name: (
				<SettingsTabLabel
					icon={<Keyboard size={16} />}
					labelKey="routes:shortcuts"
				/>
			),
			route: ROUTES.SHORTCUTS,
			key: ROUTES.SHORTCUTS,
		},
	];
};

export const mySettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: MySettings,
			name: (
				<SettingsTabLabel icon={<User size={16} />} labelKey="routes:my_settings" />
			),
			route: ROUTES.MY_SETTINGS,
			key: ROUTES.MY_SETTINGS,
		},
	];
};

export const serviceAccountsSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: ServiceAccountsSettings,
			name: (
				<SettingsTabLabel
					icon={<Bot size={16} />}
					labelKey="routes:service_accounts"
				/>
			),
			route: ROUTES.SERVICE_ACCOUNTS_SETTINGS,
			key: ROUTES.SERVICE_ACCOUNTS_SETTINGS,
		},
	];
};

export const mcpServerSettings = (): RouteTabProps['routes'] => {
	return [
		{
			Component: MCPServerSettings,
			name: (
				<SettingsTabLabel
					icon={<Sparkles size={16} />}
					labelKey="routes:mcp_server"
				/>
			),
			route: ROUTES.MCP_SERVER,
			key: ROUTES.MCP_SERVER,
		},
	];
};
