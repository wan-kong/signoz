import { Pencil, Trash2 } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';
import type { DashboardtypesLinkDTO } from 'api/generated/services/sigNoz.schemas';

import styles from './ContextLinksSection.module.scss';

interface ContextLinkListItemProps {
	link: DashboardtypesLinkDTO;
	index: number;
	onEdit: () => void;
	onRemove: () => void;
}

/** A saved context link in the section list: its label + URL, with edit / delete actions. */
function ContextLinkListItem({
	link,
	index,
	onEdit,
	onRemove,
}: ContextLinkListItemProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const label =
		link.name?.trim() ||
		link.url ||
		t('dashboard_page_v2.panel_config.context_links.untitled_link');

	return (
		<div className={styles.listItem} data-testid={`context-link-item-${index}`}>
			<div className={styles.listItemText}>
				<Typography.Text className={styles.listItemLabel}>{label}</Typography.Text>
				{!!link.url && (
					<Typography.Text className={styles.listItemUrl}>
						{link.url}
					</Typography.Text>
				)}
			</div>
			<div className={styles.listItemActions}>
				<Button
					type="button"
					variant="ghost"
					color="secondary"
					size="icon"
					aria-label={t('dashboard_page_v2.panel_config.context_links.edit_link', {
						index: index + 1,
					})}
					data-testid={`context-link-edit-${index}`}
					onClick={onEdit}
				>
					<Pencil size={14} />
				</Button>
				<Button
					type="button"
					variant="ghost"
					color="destructive"
					size="icon"
					aria-label={t('dashboard_page_v2.panel_config.context_links.remove_link', {
						index: index + 1,
					})}
					data-testid={`context-link-remove-${index}`}
					onClick={onRemove}
				>
					<Trash2 size={14} />
				</Button>
			</div>
		</div>
	);
}

export default ContextLinkListItem;
