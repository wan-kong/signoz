import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { Typography } from '@signozhq/ui/typography';
import { ArrowUpRight, Copy } from '@signozhq/icons';
import { Trans, useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import { toast } from '@signozhq/ui/sonner';
import logEvent from 'api/common/logEvent';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { DashboardListEvents } from 'pages/DashboardsListPageV2/constants/events';

import styles from './LegacyDashboardDialog.module.scss';

interface LegacyDashboardDialogProps {
	open: boolean;
	dashboardId: string;
	dashboardName: string;
	onClose: () => void;
}

/**
 * Explains why a legacy (pre-v2) dashboard can't be opened in the new experience
 * and hands the user the dashboard ID to share with support. Legacy rows are
 * surfaced by the list API with `legacy: true` but have no v2 spec to render.
 */
function LegacyDashboardDialog({
	open,
	dashboardId,
	dashboardName,
	onClose,
}: LegacyDashboardDialogProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const [, copyToClipboard] = useCopyToClipboard();
	const { isCloudUser } = useGetTenantLicense();

	const onCopyId = (): void => {
		copyToClipboard(dashboardId);
		toast.success(t('dashboards_list_page_v2.legacy.dashboard_id_copied'));
		void logEvent(DashboardListEvents.LegacyDialogAction, {
			action: 'copyId',
			dashboardId,
		});
	};

	const onContactSupport = (): void => {
		handleContactSupport(!!isCloudUser);
		void logEvent(DashboardListEvents.LegacyDialogAction, {
			action: 'contactSupport',
			dashboardId,
		});
	};

	return (
		<DialogWrapper
			title={t('dashboards_list_page_v2.legacy.title')}
			open={open}
			width="narrow"
			onOpenChange={(next): void => {
				if (!next) {
					onClose();
				}
			}}
			footer={
				<div className={styles.footer}>
					<Button
						variant="ghost"
						color="secondary"
						size="md"
						onClick={onClose}
						testId="legacy-dashboard-close"
					>
						{t('dashboards_list_page_v2.actions.close')}
					</Button>
					<Button
						variant="solid"
						color="primary"
						size="md"
						suffix={<ArrowUpRight size={14} />}
						onClick={onContactSupport}
						testId="legacy-dashboard-contact-support"
					>
						{t('dashboards_list_page_v2.actions.contact_support')}
					</Button>
				</div>
			}
		>
			<div className={styles.body}>
				<Typography.Text className={styles.description}>
					<Trans
						t={t}
						i18nKey="dashboards_list_page_v2.legacy.description"
						values={{
							name:
								dashboardName ||
								t('dashboards_list_page_v2.legacy.default_dashboard_name'),
						}}
						components={{ name: <strong /> }}
					/>
				</Typography.Text>

				<div className={styles.idField}>
					<Typography.Text className={styles.idLabel}>
						{t('dashboards_list_page_v2.legacy.dashboard_id')}
					</Typography.Text>
					<div className={styles.idRow}>
						<Typography.Text
							className={styles.idValue}
							data-testid="legacy-dashboard-id"
						>
							{dashboardId}
						</Typography.Text>
						<Button
							variant="ghost"
							color="secondary"
							size="icon"
							prefix={<Copy size={14} />}
							aria-label={t('dashboards_list_page_v2.legacy.copy_dashboard_id')}
							onClick={onCopyId}
							testId="legacy-dashboard-copy-id"
						/>
					</div>
				</div>
			</div>
		</DialogWrapper>
	);
}

export default LegacyDashboardDialog;
