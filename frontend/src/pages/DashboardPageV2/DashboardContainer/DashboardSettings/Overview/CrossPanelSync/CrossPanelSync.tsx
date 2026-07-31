import { useTranslation } from 'react-i18next';
import { ExternalLink, SolidInfoCircle } from '@signozhq/icons';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import { Events } from 'constants/events';
import { DashboardDetailEvents } from 'pages/DashboardPageV2/constants/events';
import { useDashboardCursorSyncMode } from 'hooks/dashboard/useDashboardCursorSyncMode';
import { useSyncTooltipFilterMode } from 'hooks/dashboard/useSyncTooltipFilterMode';
import {
	DashboardCursorSync,
	SyncTooltipFilterMode,
} from 'lib/uPlotV2/plugins/TooltipPlugin/types';
import { getAbsoluteUrl } from 'utils/basePath';
import cx from 'classnames';

import SegmentedControl from '../SegmentedControl/SegmentedControl';
import settingsStyles from '../../DashboardSettings.module.scss';
import styles from './CrossPanelSync.module.scss';

interface CrossPanelSyncProps {
	dashboardId: string;
}

function CrossPanelSync({ dashboardId }: CrossPanelSyncProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const [cursorSyncMode, setCursorSyncMode] =
		useDashboardCursorSyncMode(dashboardId);
	const [syncTooltipFilterMode, setSyncTooltipFilterMode] =
		useSyncTooltipFilterMode(dashboardId);

	const handleCursorSyncChange = (value: DashboardCursorSync): void => {
		void logEvent(DashboardDetailEvents.CursorSyncChanged, {
			mode: value,
			dashboardId,
		});
		setCursorSyncMode(value);
	};

	const handleTooltipFilterModeChange = (value: SyncTooltipFilterMode): void => {
		void logEvent(Events.TOOLTIP_SYNC_MODE_CHANGED, {
			path: getAbsoluteUrl(window.location.pathname),
			mode: value,
		});
		setSyncTooltipFilterMode(value);
	};

	return (
		<div className={cx(settingsStyles.settingsCard, styles.crossPanelSyncGroup)}>
			<div className={styles.crossPanelSyncSectionHeader}>
				<Typography.Text className={styles.crossPanelsSyncSectionTitle}>
					{t('dashboard_page_v2.settings.cross_panel_sync.title')}
				</Typography.Text>

				<TooltipSimple
					side="top"
					withPortal={false}
					title={
						<div className={styles.crossPanelSyncTooltipContent}>
							<strong className={styles.crossPanelSyncTooltipTitle}>
								{t('dashboard_page_v2.settings.cross_panel_sync.title')}
							</strong>
							<span className={styles.crossPanelSyncTooltipDescription}>
								{t('dashboard_page_v2.settings.cross_panel_sync.description')}
							</span>
							<Typography.Link
								href="https://signoz.io/docs/dashboards/interactivity/#cross-panel-sync"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.crossPanelSyncTooltipDocLink}
							>
								{t('learn_more')}
								<ExternalLink size={12} />
							</Typography.Link>
						</div>
					}
				>
					<SolidInfoCircle size="md" className={styles.crossPanelSyncInfoIcon} />
				</TooltipSimple>
			</div>

			<div className={styles.crossPanelSyncRow}>
				<div className={styles.crossPanelSyncInfo}>
					<Typography.Text className={styles.crossPanelSyncTitle}>
						{t('dashboard_page_v2.settings.cross_panel_sync.sync_mode')}
					</Typography.Text>
					<Typography.Text className={styles.crossPanelSyncDescription}>
						{t('dashboard_page_v2.settings.cross_panel_sync.description')}
					</Typography.Text>
				</div>
				<SegmentedControl
					testId="cursor-sync-mode"
					value={cursorSyncMode}
					onChange={handleCursorSyncChange}
					options={[
						{
							label: t('dashboard_page_v2.settings.cross_panel_sync.no_sync'),
							value: DashboardCursorSync.None,
						},
						{
							label: t('dashboard_page_v2.settings.cross_panel_sync.crosshair'),
							value: DashboardCursorSync.Crosshair,
						},
						{
							label: t('dashboard_page_v2.settings.cross_panel_sync.tooltip'),
							value: DashboardCursorSync.Tooltip,
						},
					]}
				/>
			</div>

			{cursorSyncMode === DashboardCursorSync.Tooltip && (
				<div className={styles.crossPanelSyncRow}>
					<div className={styles.crossPanelSyncInfo}>
						<Typography.Text className={styles.crossPanelSyncTitle}>
							{t('dashboard_page_v2.settings.cross_panel_sync.synced_series')}
						</Typography.Text>
						<Typography.Text className={styles.crossPanelSyncDescription}>
							{t(
								'dashboard_page_v2.settings.cross_panel_sync.synced_series_description',
							)}
						</Typography.Text>
					</div>

					<SegmentedControl
						testId="sync-tooltip-filter-mode"
						value={syncTooltipFilterMode}
						onChange={handleTooltipFilterModeChange}
						options={[
							{
								label: t('dashboard_page_v2.settings.cross_panel_sync.all'),
								value: SyncTooltipFilterMode.All,
							},
							{
								label: t('dashboard_page_v2.settings.cross_panel_sync.filtered'),
								value: SyncTooltipFilterMode.Filtered,
							},
						]}
					/>
				</div>
			)}
		</div>
	);
}

export default CrossPanelSync;
