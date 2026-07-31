import { Typography } from '@signozhq/ui/typography';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import history from 'lib/history';
import { ArrowRight } from '@signozhq/icons';
import { openInNewTab } from 'utils/navigation';
import { useTranslation } from 'react-i18next';

import awwSnapUrl from '@/assets/Icons/awwSnap.svg';

import { translateInfraKey, translateInfraText } from '../../i18n';
import styles from './EntityError.module.scss';

export default function EntityError(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();

	const handleContactSupport = (): void => {
		if (isCloudUserVal) {
			history.push('/support');
		} else {
			openInNewTab('https://signoz.io/slack');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<img src={awwSnapUrl} alt="error" className={styles.icon} />
				<Typography.Text>
					<span className={styles.title}>
						{translateInfraKey(t, 'display.aw_snap', 'Aw snap :/')}{' '}
					</span>
					{translateInfraText(
						t,
						'Something went wrong. Please try again or contact support.',
					)}
				</Typography.Text>

				<div
					className={styles.contactSupport}
					onClick={handleContactSupport}
					role="button"
					tabIndex={0}
					onKeyDown={(e): void => {
						if (e.key === 'Enter') {
							handleContactSupport();
						}
					}}
				>
					<Typography.Link className={styles.contactSupportText}>
						{translateInfraKey(t, 'display.contact_support', 'Contact Support')}
					</Typography.Link>
					<ArrowRight size={14} />
				</div>
			</div>
		</div>
	);
}
