import { Typography } from '@signozhq/ui/typography';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import history from 'lib/history';
import { ArrowRight } from '@signozhq/icons';
import { openInNewTab } from 'utils/navigation';
import { useTranslation } from 'react-i18next';

import awwSnapUrl from '@/assets/Icons/awwSnap.svg';

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
						{t('display.aw_snap', { defaultValue: 'Aw snap :/' })}{' '}
					</span>
					{t('display.something_went_wrong_try_again_contact_support', {
						defaultValue:
							'Something went wrong. Please try again or contact support.',
					})}
				</Typography.Text>

				<button
					type="button"
					className={styles.contactSupport}
					onClick={handleContactSupport}
				>
					<Typography.Link className={styles.contactSupportText}>
						{t('display.contact_support', { defaultValue: 'Contact Support' })}
					</Typography.Link>
					<ArrowRight size={14} />
				</button>
			</div>
		</div>
	);
}
