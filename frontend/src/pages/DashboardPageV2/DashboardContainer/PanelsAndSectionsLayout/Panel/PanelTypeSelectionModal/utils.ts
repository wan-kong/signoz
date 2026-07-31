import { LayoutDashboard, Rows2 } from '@signozhq/icons';
import type { TFunction } from 'i18next';

import { findRootSection, type DashboardSection } from '../../../utils';
import type { SectionOption } from './types';

/** Maps dashboard sections to section-picker options (untitled → "root"). */
export function buildSectionOptions(
	sections: DashboardSection[],
	t: TFunction,
): SectionOption[] {
	const rootSection = findRootSection(sections);
	return sections.map((section) => {
		const isRoot = rootSection === section;
		return {
			value: String(section.layoutIndex),
			layoutIndex: section.layoutIndex,
			label: isRoot
				? t('dashboard_page_v2.panel_config.panel_type_modal.dashboard_root')
				: (section.title as string),
			description: isRoot
				? t('dashboard_page_v2.panel_config.panel_type_modal.top_level_no_section')
				: t('dashboard_page_v2.panel_config.panel_type_modal.section'),
			isRoot,
			Icon: isRoot ? LayoutDashboard : Rows2,
		};
	});
}

/**
 * Picks the option the picker should open on: the section the "Add panel" was
 * triggered from when present and still valid, otherwise the first option.
 */
export function resolveDefaultSectionValue(
	options: SectionOption[],
	defaultLayoutIndex: number | undefined,
): string {
	const fallback = options[0]?.value ?? '';
	if (defaultLayoutIndex === undefined) {
		return fallback;
	}
	const target = String(defaultLayoutIndex);
	return options.some((option) => option.value === target) ? target : fallback;
}
