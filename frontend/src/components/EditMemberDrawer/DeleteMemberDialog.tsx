import { Trash2, X } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { useTranslation } from 'react-i18next';
import { MemberRow } from 'components/MembersTable/MembersTable';

interface DeleteMemberDialogProps {
	open: boolean;
	isInvited: boolean;
	member: MemberRow | null;
	isDeleting: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

function DeleteMemberDialog({
	open,
	isInvited,
	member,
	isDeleting,
	onClose,
	onConfirm,
}: DeleteMemberDialogProps): JSX.Element {
	const { t } = useTranslation('common');
	const title = isInvited
		? t('delete_member.revoke_invite')
		: t('delete_member.delete_member');

	const body = isInvited ? (
		<>{t('delete_member.revoke_confirm', { email: member?.email })}</>
	) : (
		<>
			{t('delete_member.delete_confirm', { name: member?.name || member?.email })}
		</>
	);

	const footer = (
		<>
			<Button variant="solid" color="secondary" onClick={onClose}>
				<X size={12} />
				{t('delete_member.cancel')}
			</Button>
			<Button
				variant="solid"
				color="destructive"
				disabled={isDeleting}
				onClick={onConfirm}
				loading={isDeleting}
			>
				<Trash2 size={12} />
				{isDeleting ? t('delete_member.processing') : title}
			</Button>
		</>
	);

	return (
		<DialogWrapper
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					onClose();
				}
			}}
			title={title}
			width="narrow"
			showCloseButton={false}
			disableOutsideClick={false}
			footer={footer}
		>
			{body}
		</DialogWrapper>
	);
}

export default DeleteMemberDialog;
