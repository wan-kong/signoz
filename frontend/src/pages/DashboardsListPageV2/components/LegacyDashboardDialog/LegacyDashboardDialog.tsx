import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { Typography } from '@signozhq/ui/typography';
import { ArrowUpRight, Copy, RotateCw } from '@signozhq/icons';
import { Trans, useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import { toast } from '@signozhq/ui/sonner';
import logEvent from 'api/common/logEvent';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { DashboardListEvents } from 'pages/DashboardsListPageV2/constants/events';

import { useRetryMigration } from '../../hooks/useRetryMigration';

import styles from './LegacyDashboardDialog.module.scss';

interface LegacyDashboardDialogProps {
	open: boolean;
	dashboardId: string;
	dashboardName: string;
	canEdit: boolean;
	onClose: () => void;
}

/**
 * Explains why a legacy (pre-v2) dashboard can't be opened in the new experience
 * and offers to re-run the migration. Legacy rows are surfaced by the list API
 * with `legacy: true` but have no v2 spec to render. Retrying needs edit access,
 * so viewers only get the dashboard ID to share with support.
 */
function LegacyDashboardDialog({
	open,
	dashboardId,
	dashboardName,
	canEdit,
	onClose,
}: LegacyDashboardDialogProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const [, copyToClipboard] = useCopyToClipboard();
	const { isCloudUser } = useGetTenantLicense();
	const { retryMigration, isMigrating } = useRetryMigration(onClose);

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

	const onRetryMigration = (): void => {
		retryMigration(dashboardId);
		void logEvent(DashboardListEvents.LegacyDialogAction, {
			action: 'retryMigration',
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
						disabled={isMigrating}
						onClick={onClose}
						testId="legacy-dashboard-close"
					>
						{t('dashboards_list_page_v2.actions.close')}
					</Button>
					<Button
						variant={canEdit ? 'outlined' : 'solid'}
						color={canEdit ? 'secondary' : 'primary'}
						size="md"
						suffix={<ArrowUpRight size={14} />}
						onClick={onContactSupport}
						testId="legacy-dashboard-contact-support"
					>
						{t('dashboards_list_page_v2.actions.contact_support')}
					</Button>
					{canEdit && (
						<Button
							variant="solid"
							color="primary"
							size="md"
							prefix={<RotateCw size={14} />}
							disabled={isMigrating}
							loading={isMigrating}
							onClick={onRetryMigration}
							testId="legacy-dashboard-retry-migration"
						>
							{t('dashboards_list_page_v2.legacy.retry_migration')}
						</Button>
					)}
				</div>
			}
		>
			<div className={styles.body}>
				<Typography.Text className={styles.description}>
					<Trans
						t={t}
						i18nKey={
							canEdit
								? 'dashboards_list_page_v2.legacy.description_can_edit'
								: 'dashboards_list_page_v2.legacy.description'
						}
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
