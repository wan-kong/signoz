import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import NewDashboardButton from './NewDashboardButton';

import styles from './DashboardsList.module.scss';

interface Props {
	label: string;
	count: number;
	isModified: boolean;
	canCreate: boolean;
	onCreate: () => void;
}

function CommandHeader({
	label,
	count,
	isModified,
	canCreate,
	onCreate,
}: Props): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.commandHeader}>
			<div className={styles.headingBlock}>
				<Typography.Title className={styles.title}>{label}</Typography.Title>
				{isModified && (
					<span
						className={styles.dirtyDot}
						title={t('dashboards_list_page_v2.unsaved_changes')}
					/>
				)}
				<span className={styles.countPill}>{count}</span>
			</div>
			<div className={styles.grow} />
			{canCreate && <NewDashboardButton onClick={onCreate} />}
		</div>
	);
}

export default CommandHeader;
