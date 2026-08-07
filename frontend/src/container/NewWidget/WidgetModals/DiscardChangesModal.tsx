import { useTranslation } from 'react-i18next';
import { SolidAlertTriangle } from '@signozhq/icons';
import { ConfirmDialog } from '@signozhq/ui/dialog';
import { Typography } from '@signozhq/ui/typography';

export interface DiscardChangesModalProps {
	open: boolean;
	isNewPanel: boolean;
	panelTitle?: string;
	dashboardTitle?: string;
	onDiscard: () => void;
	onClose: () => void;
}

export default function DiscardChangesModal({
	open,
	isNewPanel,
	panelTitle,
	dashboardTitle,
	onDiscard,
	onClose,
}: DiscardChangesModalProps): JSX.Element {
	const { t } = useTranslation('new_widget');
	const dashboardName = dashboardTitle ? (
		<>
			{' '}
			{t('discard_changes.to', 'to')} <strong>{dashboardTitle}</strong>
		</>
	) : null;
	const panelLabel = panelTitle ? (
		<strong>{panelTitle}</strong>
	) : (
		t('discard_changes.this_panel', 'this panel')
	);

	return (
		<ConfirmDialog
			open={open}
			onOpenChange={(next): void => {
				if (!next) {
					onClose();
				}
			}}
			title={t('discard_changes.title', 'Discard changes?')}
			titleIcon={<SolidAlertTriangle size={14} color="#fdd600" />}
			confirmText={t('discard_changes.confirm', 'Discard')}
			confirmColor="destructive"
			cancelText={t('discard_changes.cancel', 'Keep editing')}
			onConfirm={onDiscard}
			onCancel={onClose}
		>
			{isNewPanel ? (
				<Typography>
					{t('discard_changes.new_panel_message', "This new panel won't be added")}
					{dashboardName}.
				</Typography>
			) : (
				<Typography>
					{t('discard_changes.edits_lost_prefix', 'Your unsaved edits to')}{' '}
					{panelLabel} {t('discard_changes.will_be_lost_suffix', 'will be lost.')}
				</Typography>
			)}
		</ConfirmDialog>
	);
}
