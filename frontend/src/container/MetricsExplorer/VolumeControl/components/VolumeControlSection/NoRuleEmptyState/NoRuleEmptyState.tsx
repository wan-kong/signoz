import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';

import styles from './NoRuleEmptyState.module.scss';

interface NoRuleEmptyStateProps {
	canManage: boolean;
	onSetup: () => void;
}

function NoRuleEmptyState({
	canManage,
	onSetup,
}: NoRuleEmptyStateProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className={styles.emptyState} data-testid="volume-control-empty">
			<Typography.Text size="small" color="muted">
				{t(
					'volume_control.empty_no_rule',
					'No volume control rule. All series are retained. Aggregate away high-cardinality attributes to reduce cost.',
				)}
			</Typography.Text>
			{canManage && (
				<Button
					variant="solid"
					color="primary"
					className={styles.setupButton}
					onClick={onSetup}
					data-testid="volume-control-setup"
				>
					{t('volume_control.setup_cta', 'Set up volume control')}
				</Button>
			)}
		</div>
	);
}

export default NoRuleEmptyState;
