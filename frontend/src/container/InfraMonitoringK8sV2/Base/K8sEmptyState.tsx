import ErrorContent from 'components/ErrorModal/components/ErrorContent';
import { useTranslation } from 'react-i18next';

import emptyStateUrl from '@/assets/Icons/emptyState.svg';
import eyesEmojiUrl from '@/assets/Images/eyesEmoji.svg';

import type { K8sBaseListEmptyStateContext } from './K8sBaseList';

import styles from './K8sEmptyState.module.scss';

type K8sEmptyStateProps = Partial<K8sBaseListEmptyStateContext>;

export function K8sEmptyState({
	isError,
	error,
	isLoading,
	endTimeBeforeRetention,
}: K8sEmptyStateProps): JSX.Element | null {
	const { t } = useTranslation('infraMonitoring');
	if (isLoading) {
		return null;
	}

	if (isError || error) {
		return (
			<div className={styles.container}>
				<div className={styles.errorContent}>
					<ErrorContent
						error={
							error ?? {
								code: 500,
								message: t('k8s_empty_state.error_fetching'),
							}
						}
					/>
				</div>
			</div>
		);
	}

	if (endTimeBeforeRetention) {
		return (
			<div className={styles.container}>
				<div className={styles.content}>
					<img
						className={styles.eyesEmoji}
						src={eyesEmojiUrl}
						alt={t('k8s_empty_state.eyes_emoji_alt')}
					/>
					<div className={styles.noDataMessage}>
						<h5 className={styles.title}>
							{t('k8s_empty_state.before_retention_title')}
						</h5>
						<span className={styles.message}>
							{t('k8s_empty_state.before_retention_desc')}
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<img
					src={emptyStateUrl}
					alt={t('k8s_empty_state.empty_alt')}
					className={styles.emptyStateSvg}
				/>
				<span className={styles.message}>{t('k8s_empty_state.no_results')}</span>
			</div>
		</div>
	);
}
