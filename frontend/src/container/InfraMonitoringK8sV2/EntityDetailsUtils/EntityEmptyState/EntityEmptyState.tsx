import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import emptyStateUrl from '@/assets/Icons/emptyState.svg';

import styles from './EntityEmptyState.module.scss';

interface EntityEmptyStateProps {
	hasFilters: boolean;
}

export default function EntityEmptyState({
	hasFilters,
}: EntityEmptyStateProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<img src={emptyStateUrl} alt="empty-state" className={styles.icon} />
				{hasFilters ? (
					<Typography.Text>
						<span className={styles.title}>
							{t('display.this_query_had_no_results', {
								defaultValue: 'This query had no results.',
							})}{' '}
						</span>
						{t('display.edit_your_query_and_try_again', {
							defaultValue: 'Edit your query and try again!',
						})}
					</Typography.Text>
				) : (
					<Typography.Text>
						<span className={styles.title}>
							{t('display.no_data_yet', { defaultValue: 'No data yet.' })}{' '}
						</span>
						{t('display.when_we_receive_data', {
							defaultValue: 'When we receive data, it will show up here.',
						})}
					</Typography.Text>
				)}
			</div>
		</div>
	);
}
