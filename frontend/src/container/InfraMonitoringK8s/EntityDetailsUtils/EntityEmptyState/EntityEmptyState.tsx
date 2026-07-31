import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import emptyStateUrl from '@/assets/Icons/emptyState.svg';

import { translateInfraKey } from '../../i18n';
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
							{translateInfraKey(
								t,
								'display.this_query_had_no_results',
								'This query had no results.',
							)}{' '}
						</span>
						{translateInfraKey(
							t,
							'display.edit_your_query_and_try_again',
							'Edit your query and try again!',
						)}
					</Typography.Text>
				) : (
					<Typography.Text>
						<span className={styles.title}>
							{translateInfraKey(t, 'display.no_data_yet', 'No data yet.')}{' '}
						</span>
						{translateInfraKey(
							t,
							'display.when_we_receive_data',
							'When we receive data, it will show up here.',
						)}
					</Typography.Text>
				)}
			</div>
		</div>
	);
}
