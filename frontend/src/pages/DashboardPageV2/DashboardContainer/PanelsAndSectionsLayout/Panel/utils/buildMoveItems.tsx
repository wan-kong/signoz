import { FolderInput } from '@signozhq/icons';
import type { MenuItem } from '@signozhq/ui/dropdown-menu';

import { findRootSection, type DashboardSection } from '../../../utils';
import type { MovePanelArgs } from '../hooks/useMovePanelToSection';

type Translate = (key: string, options?: Record<string, unknown>) => string;

interface MoveItemsArgs {
	sections: DashboardSection[];
	currentLayoutIndex: number;
	panelId: string;
	movePanel: (args: MovePanelArgs) => Promise<void>;
	t: Translate;
}

/**
 * "Move to section" submenu listing every section the panel can move to — the
 * dashboard root (untitled top level, labelled "Dashboard (root)") plus every
 * titled section, minus the one the panel already sits in. Hidden entirely when
 * there is nowhere to move: an ungrouped board with no titled sections, or a
 * panel that is alone in the only section.
 */
export function buildMoveItems({
	sections,
	currentLayoutIndex,
	panelId,
	movePanel,
	t,
}: MoveItemsArgs): MenuItem[] {
	const rootSection = findRootSection(sections);

	// Sections are already in layout order, so the root (index 0, when present)
	// naturally leads. Untitled non-root layouts are never a move target.
	const targets = sections.filter(
		(section) =>
			section.layoutIndex !== currentLayoutIndex &&
			(section === rootSection || Boolean(section.title)),
	);

	if (targets.length === 0) {
		return [];
	}

	return [
		{
			key: 'move',
			label: t('dashboard_page_v2.panel_actions.move_to_section'),
			icon: <FolderInput size={14} />,
			children: targets.map((section) => {
				const isRoot = section === rootSection;
				return {
					key: isRoot ? 'move-to-root' : `move-${section.layoutIndex}`,
					label: isRoot
						? t('dashboard_page_v2.panel_actions.dashboard_root')
						: (section.title as string),
					onClick: (): void =>
						void movePanel({
							panelId,
							fromLayoutIndex: currentLayoutIndex,
							toLayoutIndex: section.layoutIndex,
						}),
				};
			}),
		},
	];
}
