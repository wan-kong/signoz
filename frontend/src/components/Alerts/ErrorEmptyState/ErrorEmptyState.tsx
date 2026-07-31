import { useCallback } from 'react';
import { LifeBuoy, RefreshCw, TriangleAlert } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { useTranslation } from 'react-i18next';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';

import styles from './ErrorEmptyState.module.scss';

interface ErrorEmptyStateProps {
	title?: string;
	subtitle?: string;
	onRefresh?: () => void;
}

function ErrorEmptyState({
	title,
	subtitle,
	onRefresh,
}: ErrorEmptyStateProps): JSX.Element {
	const { t } = useTranslation('common');
	const { isCloudUser } = useGetTenantLicense();

	const onContactSupport = useCallback((): void => {
		handleContactSupport(isCloudUser);
	}, [isCloudUser]);

	return (
		<div className={styles.emptyState} data-testid="error-empty-state">
			<TriangleAlert className={styles.icon} size={32} />
			<div className={styles.title} data-testid="error-title">
				{title || t('empty_states.error_title')}
			</div>
			<div className={styles.subtitle} data-testid="error-subtitle">
				{subtitle || t('empty_states.error_subtitle')}
			</div>
			<div className={styles.actions}>
				<Button
					variant="solid"
					color="secondary"
					prefix={<LifeBuoy size={14} />}
					onClick={onContactSupport}
					data-testid="error-contact-support-button"
				>
					{t('empty_states.contact_support')}
				</Button>
				{onRefresh && (
					<Button
						variant="outlined"
						color="secondary"
						prefix={<RefreshCw size={14} />}
						onClick={onRefresh}
						data-testid="error-refresh-button"
					>
						{t('empty_states.refresh')}
					</Button>
				)}
			</div>
		</div>
	);
}

export default ErrorEmptyState;
