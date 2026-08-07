import { useTranslation } from 'react-i18next';
import { AlertDialog } from '@signozhq/ui/alert-dialog';
import { Button } from '@signozhq/ui/button';
import { Trash2, X } from '@signozhq/icons';

interface DiscardChangesDialogProps {
	open: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

function DiscardChangesDialog({
	open,
	onConfirm,
	onCancel,
}: DiscardChangesDialogProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<AlertDialog
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					onCancel();
				}
			}}
			width="narrow"
			title={t('llm_observability.discard_unsaved_title')}
			titleIcon={<Trash2 size={16} />}
			footer={
				<>
					<Button
						variant="solid"
						color="secondary"
						onClick={onCancel}
						prefix={<X size={12} />}
						testId="discard-changes-cancel-btn"
					>
						{t('llm_observability.keep_editing')}
					</Button>
					<Button
						variant="solid"
						color="destructive"
						onClick={onConfirm}
						prefix={<Trash2 size={12} />}
						testId="discard-changes-confirm-btn"
					>
						{t('llm_observability.discard_changes')}
					</Button>
				</>
			}
		>
			This reverts every unsaved group and mapping change back to the last saved
			state. This action cannot be undone.
		</AlertDialog>
	);
}

export default DiscardChangesDialog;
