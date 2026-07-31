import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';
import { ArrowUpRight } from '@signozhq/icons';
import logEvent from 'api/common/logEvent';

import dashboardsUrl from '@/assets/Icons/dashboards.svg';

import styles from './EmptyState.module.scss';
import { openInNewTab } from 'utils/navigation';

interface Props {
	createDropdown?: ReactNode;
}

const LEARN_MORE_HREF =
	'https://signoz.io/docs/userguide/manage-dashboards?utm_source=product&utm_medium=dashboard-list-empty-state';

function EmptyState({ createDropdown }: Props): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.wrapper}>
			<img src={dashboardsUrl} alt="dashboards" className={styles.image} />
			<section className={styles.copy}>
				<Typography.Text className={styles.noDashboard}>
					{t('dashboards_list_page_v2.empty.no_dashboards_yet')}{' '}
				</Typography.Text>
				<Typography.Text className={styles.info}>
					{t('dashboards_list_page_v2.empty.description')}
				</Typography.Text>
			</section>

			{createDropdown ? (
				<section className={styles.actions}>
					{createDropdown}
					<Button
						variant="link"
						color="primary"
						className={styles.learnMore}
						testId="learn-more"
						onClick={(): void => {
							void logEvent('Dashboard List: Learn more clicked', {});
							openInNewTab(LEARN_MORE_HREF);
						}}
					>
						{t('dashboards_list_page_v2.actions.learn_more')}
					</Button>
					<ArrowUpRight size={16} className={styles.learnMoreArrow} />
				</section>
			) : null}
		</div>
	);
}

export default EmptyState;
