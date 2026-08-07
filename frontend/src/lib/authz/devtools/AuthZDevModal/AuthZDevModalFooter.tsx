import { Kbd } from '@signozhq/ui/kbd';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import styles from './AuthZDevModal.module.css';

export interface AuthZDevModalFooterProps {
	orderedPermissionsCount: number;
	observedListLength: number;
}

export function AuthZDevModalFooter({
	orderedPermissionsCount,
	observedListLength,
}: AuthZDevModalFooterProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className={styles.footer}>
			<div className={styles.hint}>
				<span className={styles.hintGroup}>
					<Kbd>Esc</Kbd>
					<Typography.Text as="span" size="small" color="muted">
						{t('authz_dev.close', 'close')}
					</Typography.Text>
				</span>
			</div>
			<Typography.Text size="small" color="muted" className={styles.count}>
				{t('authz_dev.permissions_count', '{{count}} of {{total}} permissions', {
					count: orderedPermissionsCount,
					total: observedListLength,
				})}
			</Typography.Text>
		</div>
	);
}
