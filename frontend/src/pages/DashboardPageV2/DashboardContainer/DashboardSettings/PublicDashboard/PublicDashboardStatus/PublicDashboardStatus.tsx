import { useTranslation } from 'react-i18next';
import { Globe, LockKeyhole } from '@signozhq/icons';
import { Badge } from '@signozhq/ui/badge';
import { Typography } from '@signozhq/ui/typography';
import cx from 'classnames';

import styles from './PublicDashboardStatus.module.scss';

interface PublicDashboardStatusProps {
	isPublic: boolean;
}

function PublicDashboardStatus({
	isPublic,
}: PublicDashboardStatusProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	return (
		<div
			className={cx(styles.statusStrip, { [styles.statusStripLive]: isPublic })}
		>
			<span
				className={cx(styles.statusMedallion, {
					[styles.statusMedallionLive]: isPublic,
				})}
			>
				{isPublic ? <Globe size={18} /> : <LockKeyhole size={18} />}
			</span>

			<div className={styles.statusBody}>
				<Typography.Text className={styles.statusTitle}>
					{isPublic
						? t('dashboard_page_v2.public_dashboard.live_title')
						: t('dashboard_page_v2.public_dashboard.private_title')}
				</Typography.Text>
				<Typography.Text
					className={cx(styles.statusSubtitle, {
						[styles.statusSubtitleLive]: isPublic,
					})}
				>
					{isPublic
						? t('dashboard_page_v2.public_dashboard.live_description')
						: t('dashboard_page_v2.public_dashboard.private_description')}
				</Typography.Text>
			</div>

			<Badge variant="outline" color={isPublic ? 'robin' : 'secondary'}>
				<span className={styles.statusBadgeDot} />
				{isPublic
					? t('dashboard_page_v2.public_dashboard.public')
					: t('dashboard_page_v2.public_dashboard.private')}
			</Badge>
		</div>
	);
}

export default PublicDashboardStatus;
