import { Check, Copy } from '@signozhq/icons';
import { Badge } from '@signozhq/ui/badge';
import { Button } from '@signozhq/ui/button';
import { Callout } from '@signozhq/ui/callout';
import { useTranslation } from 'react-i18next';
import type { ServiceaccounttypesGettableFactorAPIKeyWithKeyDTO } from 'api/generated/services/sigNoz.schemas';

export interface KeyCreatedPhaseProps {
	createdKey: ServiceaccounttypesGettableFactorAPIKeyWithKeyDTO;
	hasCopied: boolean;
	expiryLabel: string;
	onCopy: () => void;
}

function KeyCreatedPhase({
	createdKey,
	hasCopied,
	expiryLabel,
	onCopy,
}: KeyCreatedPhaseProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className="add-key-modal__form">
			<div className="add-key-modal__field">
				<span className="add-key-modal__label">
					{t('sa_add_key.key_label', 'Key')}
				</span>
				<div className="add-key-modal__key-display">
					<span className="add-key-modal__key-text">{createdKey.key}</span>
					<Button
						variant="link"
						color="secondary"
						onClick={onCopy}
						className="add-key-modal__copy-btn"
					>
						{hasCopied ? <Check size={12} /> : <Copy size={12} />}
					</Button>
				</div>
			</div>

			<div className="add-key-modal__expiry-meta">
				<span className="add-key-modal__expiry-label">
					{t('sa_add_key.expiration', 'Expiration')}
				</span>
				<Badge color="vanilla">{expiryLabel}</Badge>
			</div>

			<div className="add-key-modal__callout-wrapper">
				<Callout
					type="info"
					showIcon
					title={t(
						'sa_add_key.secure_storage_warning',
						'Store the key securely. This is the only time it will be displayed.',
					)}
				/>
			</div>
		</div>
	);
}

export default KeyCreatedPhase;
