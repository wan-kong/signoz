import { useTranslation } from 'react-i18next';
import { Info } from '@signozhq/icons';
import { Typography } from '@signozhq/ui/typography';

import styles from './PublicDashboardHint.module.scss';

function PublicDashboardHint(): JSX.Element {
	const { t } = useTranslation('dashboard');
	return (
		<div className={styles.hint}>
			<Info size={14} className={styles.hintIcon} />
			<Typography.Text className={styles.hintText}>
				{t('dashboard_page_v2.public_dashboard.variables_not_supported')}
			</Typography.Text>
		</div>
	);
}

export default PublicDashboardHint;
