import { RouteTabProps } from 'components/RouteTab/types';
import { ROLES, USER_ROLES } from 'types/roles';

import {
	billingSettings,
	generalSettings,
	ingestionSettings,
	keyboardShortcuts,
	mcpServerSettings,
	membersSettings,
	multiIngestionSettings,
	mySettings,
	organizationSettings,
	roleCreate,
	roleDetails,
	roleEdit,
	rolesSettings,
	serviceAccountsSettings,
} from './config';

export const getRoutes = (
	userRole: ROLES | null,
	isCurrentOrgSettings: boolean,
	isGatewayEnabled: boolean,
	isWorkspaceBlocked: boolean,
	isCloudUser: boolean,
	isEnterpriseSelfHostedUser: boolean,
): RouteTabProps['routes'] => {
	const settings = [];

	const isAdmin = userRole === USER_ROLES.ADMIN;
	const isEditor = userRole === USER_ROLES.EDITOR;

	if (isWorkspaceBlocked && isAdmin) {
		settings.push(
			...organizationSettings(),
			...membersSettings(),
			...mySettings(),
			...billingSettings(),
			...keyboardShortcuts(),
		);

		return settings;
	}

	settings.push(...generalSettings());

	if (isCurrentOrgSettings) {
		settings.push(...organizationSettings());
	}

	if (isGatewayEnabled && (isAdmin || isEditor)) {
		settings.push(...multiIngestionSettings());
	}

	if (isCloudUser && !isGatewayEnabled) {
		settings.push(...ingestionSettings());
	}

	// Visible to all authenticated users
	settings.push(
		...serviceAccountsSettings(),
		...rolesSettings(),
		...roleCreate(),
		...roleDetails(),
		...roleEdit(),
	);

	// Admin-only: members management
	if (isAdmin) {
		settings.push(...membersSettings());
	}

	if ((isCloudUser || isEnterpriseSelfHostedUser) && isAdmin) {
		settings.push(...billingSettings());
	}

	settings.push(...mySettings(), ...keyboardShortcuts(), ...mcpServerSettings());

	return settings;
};
