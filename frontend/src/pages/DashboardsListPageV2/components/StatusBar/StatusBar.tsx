import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';
import { PanelLeftClose, PanelLeftOpen } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

import styles from './StatusBar.module.scss';

interface Props {
	collapsed: boolean;
	onToggleCollapse: () => void;
	count: number;
	total: number;
}

function StatusBar({
	collapsed,
	onToggleCollapse,
	count,
	total,
}: Props): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.statusBar}>
			<Button
				variant="ghost"
				color="secondary"
				size="sm"
				prefix={
					collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />
				}
				onClick={onToggleCollapse}
				testId="dashboards-rail-toggle"
			>
				{collapsed
					? t('dashboards_list_page_v2.actions.expand')
					: t('dashboards_list_page_v2.actions.collapse')}
			</Button>
			<Typography.Text className={styles.count}>
				{t('dashboards_list_page_v2.status.count', { count, total })}
			</Typography.Text>
		</div>
	);
}

export default StatusBar;
