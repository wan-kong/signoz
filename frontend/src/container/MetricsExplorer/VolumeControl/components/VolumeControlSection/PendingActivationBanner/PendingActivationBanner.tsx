import { useTranslation } from 'react-i18next';
import { Info } from '@signozhq/icons';
import { Typography } from '@signozhq/ui/typography';

import styles from './PendingActivationBanner.module.scss';

function PendingActivationBanner(): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className={styles.banner} data-testid="volume-control-pending-banner">
			<Info size={13} />
			<Typography.Text size="sm" color="muted">
				{t(
					'volume_control.pending_activation',
					"This metric's configuration was recently updated. Volume changes take effect within about 5 minutes.",
				)}
			</Typography.Text>
		</div>
	);
}

export default PendingActivationBanner;
