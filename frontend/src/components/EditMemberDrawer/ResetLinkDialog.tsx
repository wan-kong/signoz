import { Check, Copy } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { useTranslation } from 'react-i18next';

interface ResetLinkDialogProps {
	open: boolean;
	linkType: 'invite' | 'reset' | null;
	resetLink: string | null;
	expiresAt: string | null;
	hasCopied: boolean;
	onClose: () => void;
	onCopy: () => void;
}

function ResetLinkDialog({
	open,
	linkType,
	resetLink,
	expiresAt,
	hasCopied,
	onClose,
	onCopy,
}: ResetLinkDialogProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<DialogWrapper
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					onClose();
				}
			}}
			title={
				linkType === 'invite'
					? t('reset_link.invite_link')
					: t('reset_link.password_reset_link')
			}
			showCloseButton
			width="base"
			className="reset-link-dialog"
		>
			<div className="reset-link-dialog__content">
				<p className="reset-link-dialog__description">
					{linkType === 'invite'
						? t('reset_link.invite_description')
						: t('reset_link.reset_description')}
				</p>
				<div className="reset-link-dialog__link-row">
					<div className="reset-link-dialog__link-text-wrap">
						<span className="reset-link-dialog__link-text">{resetLink}</span>
					</div>
					<Button
						variant="link"
						color="secondary"
						onClick={onCopy}
						prefix={hasCopied ? <Check size={12} /> : <Copy size={12} />}
						className="reset-link-dialog__copy-btn"
					>
						{hasCopied ? t('reset_link.copied') : t('reset_link.copy')}
					</Button>
				</div>
				{expiresAt && (
					<p className="reset-link-dialog__description">
						{t('reset_link.expires_on', { date: expiresAt })}
					</p>
				)}
			</div>
		</DialogWrapper>
	);
}

export default ResetLinkDialog;
