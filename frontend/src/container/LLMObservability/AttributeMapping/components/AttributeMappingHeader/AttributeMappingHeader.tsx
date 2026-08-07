import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';

import { useCanManageAttributeMapping } from '../../hooks/useCanManageAttributeMapping';
import styles from './AttributeMappingHeader.module.scss';

interface AttributeMappingHeaderProps {
	isDirty: boolean;
	isSaving: boolean;
	onDiscard: () => void;
	onSave: () => void;
}

function AttributeMappingHeader({
	isDirty,
	isSaving,
	onDiscard,
	onSave,
}: AttributeMappingHeaderProps): JSX.Element {
	const { t } = useTranslation('llm');
	const canManage = useCanManageAttributeMapping();
	return (
		<header className={styles.pageHeader}>
			<Typography.Text as="p" size="base" color="muted">
				{t(
					'attribute_mappings_header.description',
					'Configure source-to-target attribute remapping for LLM traces',
				)}
			</Typography.Text>
			{canManage && isDirty && (
				<div className={styles.pageHeaderActions}>
					<span className={styles.unsavedChanges} data-testid="unsaved-changes">
						{t('attribute_mappings_header.unsaved_changes', 'Unsaved changes')}
					</span>
					<Button
						variant="outlined"
						color="secondary"
						onClick={onDiscard}
						disabled={isSaving}
						testId="discard-changes-btn"
					>
						{t('attribute_mappings_header.discard', 'Discard')}
					</Button>
					<Button
						variant="solid"
						color="primary"
						onClick={onSave}
						loading={isSaving}
						disabled={isSaving}
						testId="save-changes-btn"
					>
						{isSaving
							? t('attribute_mappings_header.saving', 'Saving…')
							: t('attribute_mappings_header.save_changes', 'Save changes')}
					</Button>
				</div>
			)}
		</header>
	);
}

export default AttributeMappingHeader;
