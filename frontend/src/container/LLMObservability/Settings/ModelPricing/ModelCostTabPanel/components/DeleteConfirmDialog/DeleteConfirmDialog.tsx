import { useTranslation } from 'react-i18next';
import { AlertDialog } from '@signozhq/ui/alert-dialog';
import { Button } from '@signozhq/ui/button';
import { Trash2, X } from '@signozhq/icons';

interface DeleteConfirmDialogProps {
	open: boolean;
	modelName: string;
	isDeleting: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

// Confirmation step before deleting a model cost — deletion is irreversible, so
// the destructive action is gated behind an explicit confirm. AlertDialog blocks
// outside-click dismissal and hides the close button to force an explicit choice.
function DeleteConfirmDialog({
	open,
	modelName,
	isDeleting,
	onConfirm,
	onCancel,
}: DeleteConfirmDialogProps): JSX.Element {
	const { t } = useTranslation('llm');
	return (
		<AlertDialog
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					onCancel();
				}
			}}
			width="narrow"
			title={t('model_cost_delete.title', 'Delete Model Cost Data ')}
			titleIcon={<Trash2 size={16} />}
			footer={
				<>
					<Button
						variant="solid"
						color="secondary"
						onClick={onCancel}
						prefix={<X size={12} />}
						testId="drawer-delete-cancel-btn"
					>
						{t('model_cost_delete.cancel', 'Cancel')}
					</Button>
					<Button
						variant="solid"
						color="destructive"
						loading={isDeleting}
						onClick={onConfirm}
						prefix={<Trash2 size={12} />}
						testId="drawer-delete-confirm-btn"
					>
						{t('model_cost_delete.delete', 'Delete')}
					</Button>
				</>
			}
		>
			{t(
				'model_cost_delete.confirm_message_prefix',
				'Are you sure you want to delete',
			)}{' '}
			<strong>{modelName}</strong>?{' '}
			{t(
				'model_cost_delete.confirm_message_suffix',
				'Once deleted, this action cannot be undone.',
			)}
		</AlertDialog>
	);
}

export default DeleteConfirmDialog;
