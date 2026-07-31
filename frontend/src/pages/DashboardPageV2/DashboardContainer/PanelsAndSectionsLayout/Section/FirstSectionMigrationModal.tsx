import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';

interface FirstSectionMigrationModalProps {
	open: boolean;
	isSaving: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

/**
 * Shown when the user adds the first section to a free-flowing dashboard that
 * already has panels. Confirms grouping the existing panels into a section
 * before proceeding.
 */
function FirstSectionMigrationModal({
	open,
	isSaving,
	onClose,
	onConfirm,
}: FirstSectionMigrationModalProps): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<Modal
			open={open}
			title={t('dashboard_page_v2.section_actions.group_panels_title')}
			onCancel={onClose}
			onOk={onConfirm}
			okText={t('dashboard_page_v2.section_actions.continue')}
			okButtonProps={{ disabled: isSaving, 'data-testid': 'confirm-migration' }}
			destroyOnClose
		>
			<Typography.Text>
				{t('dashboard_page_v2.section_actions.group_panels_description')}
			</Typography.Text>
		</Modal>
	);
}

export default FirstSectionMigrationModal;
