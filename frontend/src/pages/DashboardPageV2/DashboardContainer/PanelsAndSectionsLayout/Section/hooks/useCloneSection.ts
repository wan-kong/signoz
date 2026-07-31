import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@signozhq/ui/sonner';
import { cloneDeep } from 'lodash-es';
import { v4 as uuid } from 'uuid';

import logEvent from 'api/common/logEvent';
import { DashboardDetailEvents } from 'pages/DashboardPageV2/constants/events';

import { useOptimisticPatch } from '../../../hooks/useOptimisticPatch';
import { cloneSectionOps } from '../../../patchOps';
import type { DashboardSection } from '../../../utils';

/**
 * Duplicates a section with all its panels: each panel is deep-copied under a
 * fresh id and a new titled Grid ("<name> (Copy)") referencing them is appended,
 * as one atomic patch.
 */
export function useCloneSection(): (
	section: DashboardSection,
) => Promise<void> {
	const { t } = useTranslation('dashboard');
	const { patchAsync } = useOptimisticPatch();

	return useCallback(
		async (section: DashboardSection): Promise<void> => {
			const panels = section.items.flatMap((item) =>
				item.panel
					? [
							{
								newId: uuid(),
								panel: cloneDeep(item.panel),
								x: item.x,
								y: item.y,
								width: item.width,
								height: item.height,
							},
						]
					: [],
			);

			const title = section.title
				? t('dashboard_page_v2.section_actions.section_copy', {
						title: section.title,
					})
				: t('dashboard_page_v2.section_actions.default_section_copy');
			const clone = patchAsync(cloneSectionOps(title, panels));

			toast.promise(clone, {
				loading: t('dashboard_page_v2.section_actions.cloning_section'),
				success: t('dashboard_page_v2.section_actions.section_cloned'),
				error: t('dashboard_page_v2.section_actions.clone_failed'),
				position: 'top-center',
			});

			try {
				await clone;
				void logEvent(DashboardDetailEvents.SectionAction, {
					action: 'clone',
					panelCount: panels.length,
				});
			} catch {
				// toast.promise owns the error UX; the optimistic write + settle handle state.
			}
		},
		[patchAsync, t],
	);
}
