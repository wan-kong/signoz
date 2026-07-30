import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';

function AnnouncementsModal(): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<div className="announcements-modal-container">
			<div className="announcements-modal-container-header">
				<Typography.Text className="announcements-modal-title">
					{t('announcements')}
				</Typography.Text>
			</div>
		</div>
	);
}

export default AnnouncementsModal;
