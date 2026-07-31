import { RefreshCw, Search } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { useTranslation } from 'react-i18next';

import styles from './NoResultsEmptyState.module.scss';

interface NoResultsEmptyStateProps {
	title?: string;
	subtitle?: string;
	onClear?: () => void;
	clearButtonText?: string;
	onRefresh?: () => void;
}

function NoResultsEmptyState({
	title,
	subtitle,
	onClear,
	clearButtonText,
	onRefresh,
}: NoResultsEmptyStateProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className={styles.emptyState} data-testid="no-results-empty-state">
			<Search className={styles.icon} size={16} />
			<div className={styles.title} data-testid="no-results-title">
				{title || t('empty_states.no_results_title')}
			</div>
			<div className={styles.subtitle} data-testid="no-results-subtitle">
				{subtitle || t('empty_states.no_results_subtitle')}
			</div>
			<div className={styles.actions}>
				{onClear && (
					<Button
						variant="outlined"
						color="secondary"
						onClick={onClear}
						data-testid="no-results-clear-button"
					>
						{clearButtonText || t('empty_states.clear_filters_button')}
					</Button>
				)}
				{onRefresh && (
					<Button
						variant="outlined"
						color="secondary"
						prefix={<RefreshCw size={14} />}
						onClick={onRefresh}
						data-testid="no-results-refresh-button"
					>
						{t('empty_states.refresh')}
					</Button>
				)}
			</div>
		</div>
	);
}

export default NoResultsEmptyState;
