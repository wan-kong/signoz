import { ReactNode } from 'react';
import { MenuProps } from 'antd';
import i18n from 'ReactI18';

export type MenuItem = Required<MenuProps>['items'][number];

export type SidebarMenu = MenuItem & {
	tags?: string[];
};

export interface SidebarItem {
	key: string | number;
	icon?: ReactNode;
	text?: ReactNode;
	label?: ReactNode;
	labelKey?: string;
	isBeta?: boolean;
	isNew?: boolean;
	isEarlyAccess?: boolean;
	/** Hover copy for the whole item row (e.g. Noz's early-access tagline). */
	tooltip?: ReactNode;
	isPinned?: boolean;
	children?: SidebarItem[];
	isExternal?: boolean;
	url?: string;
	isEnabled?: boolean;
	itemKey?: string;
}

export const CHANGELOG_LABEL = i18n.t(
	'side_nav_extra.full_changelog',
	'Full Changelog',
	{ ns: 'common' },
);

export interface SettingsNavSection {
	title?: string;
	items: SidebarItem[];
	key: string;
	hasDivider?: boolean;
}

export interface DropdownSeparator {
	type: 'divider' | 'group';
	label?: ReactNode;
}

export enum SecondaryMenuItemKey {
	Slack = 'slack',
	Version = 'version',
	Support = 'support',
}
