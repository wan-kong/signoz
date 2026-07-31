import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, EllipsisVertical, PenLine, Plus, Trash2 } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { DropdownMenuSimple } from '@signozhq/ui/dropdown-menu';
import type { MenuItem } from '@signozhq/ui/dropdown-menu';

import DisabledMenuItemLabel from '../../../components/DisabledMenuItemLabel/DisabledMenuItemLabel';
import styles from './SectionActionsMenu.module.scss';

interface SectionActionsMenuProps {
	sectionId: string;
	/** Non-empty when edits are unavailable — items render disabled with this reason. */
	disabledReason?: string;
	onAddPanel?: () => void;
	onRename?: () => void;
	onCloneSection?: () => void;
	onDeleteSection?: () => void;
}

function SectionActionsMenu({
	sectionId,
	disabledReason = '',
	onAddPanel,
	onRename,
	onCloneSection,
	onDeleteSection,
}: SectionActionsMenuProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const items = useMemo<MenuItem[]>(() => {
		const disabled = !!disabledReason;
		const label = (text: string): ReactNode =>
			disabled ? (
				<DisabledMenuItemLabel reason={disabledReason}>
					{text}
				</DisabledMenuItemLabel>
			) : (
				text
			);
		const result: MenuItem[] = [];
		if (onAddPanel) {
			result.push({
				key: 'add-panel',
				icon: <Plus size={14} />,
				label: label(t('dashboard_page_v2.section_actions.add_panel')),
				disabled,
				onClick: onAddPanel,
			});
		}
		if (onRename) {
			result.push({
				key: 'rename',
				icon: <PenLine size={14} />,
				label: label(t('dashboard_page_v2.section_actions.rename_section')),
				disabled,
				onClick: onRename,
			});
		}
		if (onCloneSection) {
			result.push({
				key: 'clone-section',
				icon: <Copy size={14} />,
				label: label(t('dashboard_page_v2.section_actions.clone_section')),
				disabled,
				onClick: onCloneSection,
			});
		}
		if (onDeleteSection) {
			result.push(
				{ type: 'divider' },
				{
					key: 'delete-section',
					danger: true,
					icon: <Trash2 size={14} />,
					label: label(t('dashboard_page_v2.section_actions.delete_section')),
					disabled,
					onClick: onDeleteSection,
				},
			);
		}
		return result;
	}, [disabledReason, onAddPanel, onRename, onCloneSection, onDeleteSection, t]);

	return (
		<DropdownMenuSimple menu={{ items }}>
			<Button
				type="button"
				variant="ghost"
				color="secondary"
				size="icon"
				className={styles.trigger}
				aria-label={t('dashboard_page_v2.section_actions.section_actions')}
				data-testid={`dashboard-section-actions-${sectionId}`}
			>
				<EllipsisVertical size={14} />
			</Button>
		</DropdownMenuSimple>
	);
}

export default SectionActionsMenu;
