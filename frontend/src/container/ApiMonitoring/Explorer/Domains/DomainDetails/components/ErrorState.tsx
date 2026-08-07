import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { RotateCw } from '@signozhq/icons';

import awwSnapUrl from '@/assets/Icons/awwSnap.svg';

function ErrorState({ refetch }: { refetch: () => void }): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className="error-state-container">
			<div className="error-state-content-wrapper">
				<div className="error-state-content">
					<div className="icon">
						<img src={awwSnapUrl} alt="awwSnap" width={32} height={32} />
					</div>
					<div className="error-state-text">
						<Typography.Text>
							{t('api_monitoring.ran_into_an_error', 'Uh-oh :/ We ran into an error.')}
						</Typography.Text>
						<Typography.Text color="muted">
							{t(
								'api_monitoring.please_refresh_this_panel',
								'Please refresh this panel.',
							)}
						</Typography.Text>
					</div>
				</div>
				<Button
					className="refresh-cta"
					onClick={(): void => refetch()}
					icon={<RotateCw size={16} />}
				>
					{t('api_monitoring.refresh_this_panel', 'Refresh this panel')}
				</Button>
			</div>
		</div>
	);
}

export default ErrorState;
