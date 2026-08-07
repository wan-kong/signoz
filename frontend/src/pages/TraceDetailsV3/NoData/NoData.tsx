import { Button } from '@signozhq/ui/button';
import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { LifeBuoy, RefreshCw } from '@signozhq/icons';

import broomUrl from '@/assets/Icons/broom.svg';
import constructionUrl from '@/assets/Icons/construction.svg';
import noDataUrl from '@/assets/Icons/no-data.svg';

import styles from './NoData.module.scss';

function NoData(): JSX.Element {
	const { t } = useTranslation('trace');
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();

	return (
		<div className={styles.notFoundTrace} data-testid="trace-no-data">
			<section className={styles.description}>
				<img
					src={noDataUrl}
					alt={t('no_data_alt')}
					className={styles.notFoundImg}
				/>
				<Typography.Text className={styles.notFoundText1}>
					{t('no_data.trace_unavailable')}
					<span className={styles.notFoundText2}>{t('no_data.two_scenarios')}</span>
				</Typography.Text>
			</section>
			<section className={styles.reasons}>
				<div className={styles.reason}>
					<img
						src={constructionUrl}
						alt={t('no_data_alt')}
						className={styles.reasonImg}
					/>
					<Typography.Text className={styles.reasonText}>
						The trace data has not been rendered on your SigNoz server yet. You can
						wait for a bit and refresh this page if this is the case.
					</Typography.Text>
				</div>
				<div className={styles.reason}>
					<img src={broomUrl} alt={t('no_data_alt')} className={styles.reasonImg} />
					<Typography.Text className={styles.reasonText}>
						The trace has been deleted as the data has crossed it’s retention period.
					</Typography.Text>
				</div>
			</section>
			<section className={styles.noneOfAbove}>
				<Typography.Text className={styles.noneText}>
					{t('no_data.none_of_above')}
				</Typography.Text>
				<div className={styles.actionBtns}>
					<Button
						variant="outlined"
						color="secondary"
						className={styles.actionBtn}
						prefix={<RefreshCw size={14} />}
						onClick={(): void => window.location.reload()}
						testId="trace-no-data-refresh-button"
					>
						{t('no_data.refresh')}
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						className={styles.actionBtn}
						prefix={<LifeBuoy size={14} />}
						onClick={(): void => handleContactSupport(isCloudUserVal)}
						testId="trace-no-data-contact-support-button"
					>
						{t('no_data.contact_support')}
					</Button>
				</div>
			</section>
		</div>
	);
}

export default NoData;
