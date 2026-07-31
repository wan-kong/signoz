import { PersistedAnnouncementBanner } from '@signozhq/ui/announcement-banner';
import { useTranslation } from 'react-i18next';

import styles from './NoAuthBanner.module.scss';

export function NoAuthBanner(): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<PersistedAnnouncementBanner
			type="warning"
			storageKey="no-auth-banner-v1"
			testId="no-auth-banner"
			className={styles.banner}
		>
			{t('empty_states.impersonation_warning')}{' '}
			<a
				href="https://signoz.io/docs/manage/administrator-guide/configuration/impersonation-mode/"
				target="_blank"
				rel="noreferrer"
			>
				{t('empty_states.learn_more_link')}
			</a>
		</PersistedAnnouncementBanner>
	);
}

export default NoAuthBanner;
