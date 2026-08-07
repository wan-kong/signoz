import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';
import { ArrowUpRight, RotateCw } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import logEvent from 'api/common/logEvent';
import { handleContactSupport } from 'container/Integrations/utils';
import { DashboardListEvents } from 'pages/DashboardsListPageV2/constants/events';

import awwSnapUrl from '@/assets/Icons/awwSnap.svg';

import { formatQueryErrorMessage } from '../../../utils/helpers';
import styles from './ErrorState.module.scss';

interface Props {
	isCloudUser: boolean;
	onRetry: () => void;
	httpStatus?: number;
	errorMessage?: string;
}

function ErrorState({
	isCloudUser,
	onRetry,
	httpStatus,
	errorMessage,
}: Props): JSX.Element {
	const { t } = useTranslation('dashboard');
	// 4xx responses are client errors — the same request will keep failing.
	// Surface the BE-provided detail (e.g. DSL parse errors) and skip Retry.
	const isClientError =
		httpStatus !== undefined && httpStatus >= 400 && httpStatus < 500;

	const cleanedDetail = formatQueryErrorMessage(errorMessage);

	const handleRetry = (): void => {
		void logEvent(DashboardListEvents.ErrorStateAction, {
			action: 'retry',
		});
		onRetry();
	};

	const handleContactSupportClick = (): void => {
		void logEvent(DashboardListEvents.ErrorStateAction, {
			action: 'contactSupport',
		});
		handleContactSupport(isCloudUser);
	};

	return (
		<div className={styles.wrapper}>
			<img
				src={awwSnapUrl}
				alt={t('error_state.something_went_wrong_alt')}
				className={styles.img}
			/>

			{isClientError ? (
				<>
					<Typography.Text className={styles.errorText}>
						{t('dashboards_list_page_v2.errors.invalid_query')}
					</Typography.Text>
					<Typography.Text className={styles.errorDetail}>
						{cleanedDetail ||
							t('dashboards_list_page_v2.errors.invalid_query_fallback')}
					</Typography.Text>
				</>
			) : (
				<Typography.Text className={styles.errorText}>
					{t('dashboards_list_page_v2.errors.generic_message')}
				</Typography.Text>
			)}

			<section className={styles.actionButtons}>
				{!isClientError && (
					<Button
						variant="outlined"
						color="secondary"
						prefix={<RotateCw size={16} />}
						onClick={handleRetry}
						testId="dashboards-list-retry"
					>
						{t('dashboards_list_page_v2.actions.retry')}
					</Button>
				)}
				<Button
					variant="link"
					color="primary"
					className={styles.learnMore}
					onClick={handleContactSupportClick}
					testId="dashboards-list-contact-support"
				>
					{t('dashboards_list_page_v2.actions.contact_support')}
				</Button>
				<ArrowUpRight size={16} className={styles.learnMoreArrow} />
			</section>
		</div>
	);
}

export default ErrorState;
