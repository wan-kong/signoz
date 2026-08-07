import { useTranslation } from 'react-i18next';
import { LockKeyhole } from '@signozhq/icons';

import styles from './LockedIndicator.module.scss';

function LockedIndicator(): JSX.Element {
	const { t } = useTranslation('dashboard');
	return (
		<div className={styles.footer}>
			<div className={styles.lockedText} data-testid="dashboard-locked-indicator">
				<LockKeyhole size={14} />
				{t('locked_indicator.label')}
			</div>
			<div className={styles.lockedBar} />
		</div>
	);
}

export default LockedIndicator;
