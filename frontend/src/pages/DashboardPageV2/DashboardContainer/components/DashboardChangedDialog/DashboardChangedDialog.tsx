import { RotateCcw } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import logEvent from 'api/common/logEvent';
import { DashboardDetailEvents } from 'pages/DashboardPageV2/constants/events';

import { useDashboardStore } from '../../store/useDashboardStore';
import styles from './DashboardChangedDialog.module.scss';

interface DashboardChangedDialogProps {
	open: boolean;
	onReload: () => void;
	onDismiss: () => void;
}

function DashboardChangedDialog({
	open,
	onReload,
	onDismiss,
}: DashboardChangedDialogProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const dashboardId = useDashboardStore((s) => s.dashboardId);

	const handleReload = (): void => {
		void logEvent(DashboardDetailEvents.StaleReloadPrompted, {
			dashboardId,
			action: 'reload',
		});
		onReload();
	};

	const handleDismiss = (): void => {
		void logEvent(DashboardDetailEvents.StaleReloadPrompted, {
			dashboardId,
			action: 'dismiss',
		});
		onDismiss();
	};

	const footer = (
		<div className={styles.footer}>
			<Button
				variant="solid"
				color="secondary"
				onClick={handleDismiss}
				testId="dashboard-changed-dismiss"
			>
				{t('dashboard_page_v2.dashboard_changed.dismiss')}
			</Button>
			<Button
				variant="solid"
				color="primary"
				prefix={<RotateCcw size={12} />}
				onClick={handleReload}
				testId="dashboard-changed-reload"
			>
				{t('dashboard_page_v2.dashboard_changed.reload')}
			</Button>
		</div>
	);

	return (
		<DialogWrapper
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					onDismiss();
				}
			}}
			title={t('dashboard_page_v2.dashboard_changed.title')}
			width="narrow"
			showCloseButton={false}
			footer={footer}
		>
			<div className={styles.body}>
				{t('dashboard_page_v2.dashboard_changed.description')}
			</div>
		</DialogWrapper>
	);
}

export default DashboardChangedDialog;
