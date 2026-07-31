import { LayoutGrid } from '@signozhq/icons';

import HeaderRightSection from 'components/HeaderRightSection/HeaderRightSection';
import DashboardsList from './components/DashboardsList/DashboardsList';

import styles from './DashboardsListPageV2.module.scss';
import { BreadcrumbLink } from '@signozhq/ui/breadcrumb';
import { useTranslation } from 'react-i18next';

function DashboardsListPageV2(): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<BreadcrumbLink icon={<LayoutGrid size={14} />}>
						{t('dashboards_list_page_v2.breadcrumb')}
					</BreadcrumbLink>
				</div>
				<HeaderRightSection
					enableAnnouncements={false}
					enableShare
					enableFeedback
				/>
			</div>
			<DashboardsList />
		</div>
	);
}

export default DashboardsListPageV2;
