import i18n from 'ReactI18';
import { PermissionScope } from '../../types';

export enum ScopeBadgeVariant {
	ALL = 'all',
	NONE = 'none',
	SELECTED = 'selected',
}

export interface ScopeBadge {
	label: string;
	variant: ScopeBadgeVariant;
}

export function getActionLabel(actionName: string): string {
	if (!actionName) {
		return i18n.t('role_view_unknown_action', 'Unknown', {
			ns: 'organizationsettings',
		});
	}

	return actionName[0].toUpperCase() + actionName.slice(1);
}

export function getScopeBadge(
	scope: PermissionScope,
	selectedCount: number,
): ScopeBadge {
	switch (scope) {
		case PermissionScope.ALL:
			return {
				label: i18n.t('all', 'All', { ns: 'organizationsettings' }),
				variant: ScopeBadgeVariant.ALL,
			};
		case PermissionScope.ONLY_SELECTED:
			return {
				label: i18n.t(
					'role_view_only_selected_count',
					'Only selected · {{selectedCount}}',
					{
						ns: 'organizationsettings',
						selectedCount,
					},
				),
				variant: ScopeBadgeVariant.SELECTED,
			};
		case PermissionScope.NONE:
		default:
			return {
				label: i18n.t('none', 'None', { ns: 'organizationsettings' }),
				variant: ScopeBadgeVariant.NONE,
			};
	}
}
