import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import ROUTES from 'constants/routes';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { Home, LifeBuoy } from '@signozhq/icons';
import { withBasePath } from 'utils/basePath';

import cloudUrl from '@/assets/Images/cloud.svg';

import './ErrorBoundaryFallback.styles.scss';

function ErrorBoundaryFallback(): JSX.Element {
	const { t } = useTranslation('common');

	const handleReload = (): void => {
		// Hard reload resets Sentry.ErrorBoundary state; withBasePath preserves any /signoz/ prefix.
		window.location.href = withBasePath(ROUTES.HOME);
	};

	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();

	const handleSupport = useCallback(() => {
		handleContactSupport(isCloudUserVal);
	}, [isCloudUserVal]);

	return (
		<div className="error-boundary-fallback-container">
			<div className="error-boundary-fallback-content">
				<div className="error-icon">
					<img src={cloudUrl} alt="error-cloud-icon" />
				</div>
				<div className="title">{t('something_went_wrong_friendly')}</div>

				<div className="description">{t('error_boundary_description')}</div>

				<div className="actions">
					<Button
						type="primary"
						onClick={handleReload}
						icon={<Home size={16} />}
						className="periscope-btn primary"
					>
						{t('go_to_home')}
					</Button>

					<Button
						className="periscope-btn secondary"
						type="default"
						onClick={handleSupport}
						icon={<LifeBuoy size={16} />}
					>
						{t('contact_support')}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ErrorBoundaryFallback;
