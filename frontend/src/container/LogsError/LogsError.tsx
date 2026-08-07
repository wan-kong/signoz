import { Typography } from '@signozhq/ui/typography';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import history from 'lib/history';
import { ArrowRight } from '@signozhq/icons';
import { Trans, useTranslation } from 'react-i18next';

import awwSnapUrl from '@/assets/Icons/awwSnap.svg';

import './LogsError.styles.scss';

export default function LogsError(): JSX.Element {
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();
	const { t } = useTranslation('logs');

	const handleContactSupport = (): void => {
		if (isCloudUserVal) {
			history.push('/support');
		} else {
			window.open('https://signoz.io/slack', '_blank');
		}
	};

	return (
		<div className="logs-error-container">
			<div className="logs-error-content">
				<img
					src={awwSnapUrl}
					alt={t('error.emoji_alt')}
					className="error-state-svg"
				/>
				<Typography.Text>
					<Trans
						t={t}
						i18nKey="error.message"
						components={{ prefix: <span className="aww-snap" /> }}
					/>
				</Typography.Text>

				<div className="contact-support" onClick={handleContactSupport}>
					<Typography.Link className="text">
						{t('error.contact_support')}{' '}
					</Typography.Link>

					<ArrowRight size={14} />
				</div>
			</div>
		</div>
	);
}
