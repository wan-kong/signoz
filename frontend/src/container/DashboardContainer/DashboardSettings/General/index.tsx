import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Select, Space, Tooltip } from 'antd';
import { ToggleGroupSimple } from '@signozhq/ui/toggle-group';
import { Typography } from '@signozhq/ui/typography';
import AddTags from 'container/DashboardContainer/DashboardSettings/General/AddBadges';
import { useDashboardCursorSyncMode } from 'hooks/dashboard/useDashboardCursorSyncMode';
import { useSyncTooltipFilterMode } from 'hooks/dashboard/useSyncTooltipFilterMode';
import { useUpdateDashboard } from 'hooks/dashboard/useUpdateDashboard';
import {
	DashboardCursorSync,
	SyncTooltipFilterMode,
} from 'lib/uPlotV2/plugins/TooltipPlugin/types';
import { isEqual } from 'lodash-es';
import { Check, ExternalLink, SolidInfoCircle, X } from '@signozhq/icons';
import { useDashboardStore } from 'providers/Dashboard/store/useDashboardStore';

import styles from './GeneralSettings.module.scss';
import { Button } from './styles';
import { Base64Icons } from './utils';
import logEvent from 'api/common/logEvent';
import { Events } from 'constants/events';
import { getAbsoluteUrl } from 'utils/basePath';

const { Option } = Select;

function GeneralDashboardSettings(): JSX.Element {
	const { dashboardData, setDashboardData } = useDashboardStore();

	const updateDashboardMutation = useUpdateDashboard();

	const [cursorSyncMode, setCursorSyncMode] = useDashboardCursorSyncMode(
		dashboardData?.id,
	);

	const [syncTooltipFilterMode, setSyncTooltipFilterMode] =
		useSyncTooltipFilterMode(dashboardData?.id);

	const selectedData = dashboardData?.data;

	const {
		title = '',
		tags = [],
		description = '',
		image = Base64Icons[0],
	} = selectedData || {};

	const [updatedTitle, setUpdatedTitle] = useState<string>(title);
	const [updatedTags, setUpdatedTags] = useState<string[]>(tags || []);
	const [updatedDescription, setUpdatedDescription] = useState(
		description || '',
	);
	const [updatedImage, setUpdatedImage] = useState<string>(image);
	const [numberOfUnsavedChanges, setNumberOfUnsavedChanges] =
		useState<number>(0);

	const { t } = useTranslation(['dashboard', 'common']);

	const onSaveHandler = (): void => {
		if (!dashboardData) {
			return;
		}

		updateDashboardMutation.mutate(
			{
				id: dashboardData.id,
				data: {
					...dashboardData.data,
					description: updatedDescription,
					tags: updatedTags,
					title: updatedTitle,
					image: updatedImage,
				},
			},
			{
				onSuccess: (updatedDashboard) => {
					if (updatedDashboard.data) {
						setDashboardData(updatedDashboard.data);
					}
				},
				onError: () => {},
			},
		);
	};

	useEffect(() => {
		let numberOfUnsavedChanges = 0;
		const initialValues = [title, description, tags, image];
		const updatedValues = [
			updatedTitle,
			updatedDescription,
			updatedTags,
			updatedImage,
		];
		initialValues.forEach((val, index) => {
			if (!isEqual(val, updatedValues[index])) {
				numberOfUnsavedChanges += 1;
			}
		});
		setNumberOfUnsavedChanges(numberOfUnsavedChanges);
	}, [
		description,
		image,
		tags,
		title,
		updatedDescription,
		updatedImage,
		updatedTags,
		updatedTitle,
	]);

	const discardHandler = (): void => {
		setUpdatedTitle(title);
		setUpdatedImage(image);
		setUpdatedTags(tags);
		setUpdatedDescription(description);
	};

	return (
		<div className={styles.overviewContent}>
			<Col className={styles.overviewSettings}>
				<Space
					direction="vertical"
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '21px',
					}}
				>
					<div>
						<Typography className={styles.dashboardName}>
							{t('dashboard_page_v2.settings.overview.dashboard_name')}
						</Typography>
						<section className={styles.nameIconInput}>
							<Select
								defaultActiveFirstOption
								data-testid="dashboard-image"
								suffixIcon={null}
								rootClassName={styles.dashboardImageInput}
								value={updatedImage}
								onChange={(value: string): void => setUpdatedImage(value)}
							>
								{Base64Icons.map((icon) => (
									<Option value={icon} key={icon}>
										<img
											src={icon}
											alt={t('placeholder.dashboard_icon')}
											className={styles.listItemImage}
										/>
									</Option>
								))}
							</Select>
							<Input
								data-testid="dashboard-name"
								className={styles.dashboardNameInput}
								value={updatedTitle}
								onChange={(e): void => setUpdatedTitle(e.target.value)}
							/>
						</section>
					</div>

					<div>
						<Typography className={styles.dashboardName}>
							{t('dashboard_page_v2.settings.overview.description')}
						</Typography>
						<Input.TextArea
							data-testid="dashboard-desc"
							rows={6}
							value={updatedDescription}
							className={styles.descriptionTextArea}
							onChange={(e): void => setUpdatedDescription(e.target.value)}
						/>
					</div>
					<div>
						<Typography className={styles.dashboardName}>
							{t('dashboard_page_v2.settings.overview.tags')}
						</Typography>
						<AddTags tags={updatedTags} setTags={setUpdatedTags} />
					</div>
				</Space>
			</Col>
			<Col className={`${styles.overviewSettings} ${styles.crossPanelSyncGroup}`}>
				<div className={styles.crossPanelSyncSectionHeader}>
					<Typography.Text className={styles.crossPanelSyncSectionTitle}>
						{t('dashboard_page_v2.settings.cross_panel_sync.title')}
					</Typography.Text>
					<Tooltip
						title={
							<div className={styles.crossPanelSyncTooltipContent}>
								<strong className={styles.crossPanelSyncTooltipTitle}>
									{t('dashboard_page_v2.settings.cross_panel_sync.title')}
								</strong>
								<span className={styles.crossPanelSyncTooltipDescription}>
									{t(
										'dashboard_container.settings.cross_panel_sync.tooltip_description',
									)}
								</span>
								<a
									href="https://signoz.io/docs/dashboards/interactivity/#cross-panel-sync"
									target="_blank"
									rel="noopener noreferrer"
									className={styles.crossPanelSyncTooltipDocLink}
								>
									{t('learn_more', { ns: 'common' })}
									<ExternalLink size={12} />
								</a>
							</div>
						}
						placement="top"
						mouseEnterDelay={0.5}
					>
						<SolidInfoCircle size="md" className={styles.crossPanelSyncInfoIcon} />
					</Tooltip>
				</div>
				<div className={styles.crossPanelSyncRow}>
					<div className={styles.crossPanelSyncInfo}>
						<Typography.Text className={styles.crossPanelSyncTitle}>
							{t('dashboard_page_v2.settings.cross_panel_sync.sync_mode')}
						</Typography.Text>
						<Typography.Text className={styles.crossPanelSyncDescription}>
							{t('dashboard_container.settings.cross_panel_sync.tooltip_description')}
						</Typography.Text>
					</div>
					<ToggleGroupSimple
						type="single"
						value={cursorSyncMode}
						onChange={(value: string): void => {
							setCursorSyncMode(value as DashboardCursorSync);
						}}
						items={[
							{
								value: DashboardCursorSync.None,
								label: t('dashboard_page_v2.settings.cross_panel_sync.no_sync'),
							},
							{
								value: DashboardCursorSync.Crosshair,
								label: t('dashboard_page_v2.settings.cross_panel_sync.crosshair'),
							},
							{
								value: DashboardCursorSync.Tooltip,
								label: t('dashboard_page_v2.settings.cross_panel_sync.tooltip'),
							},
						]}
					/>
				</div>
				{cursorSyncMode === DashboardCursorSync.Tooltip && (
					<div className={styles.crossPanelSyncRow}>
						<div className={styles.crossPanelSyncInfo}>
							<Typography.Text className={styles.crossPanelSyncTitle}>
								{t(
									'dashboard_container.settings.cross_panel_sync.synced_tooltip_series',
								)}
							</Typography.Text>
							<Typography.Text className={styles.crossPanelSyncDescription}>
								{t(
									'dashboard_container.settings.cross_panel_sync.synced_tooltip_series_description',
								)}
							</Typography.Text>
						</div>
						<ToggleGroupSimple
							type="single"
							value={syncTooltipFilterMode}
							onChange={(value: string): void => {
								logEvent(Events.TOOLTIP_SYNC_MODE_CHANGED, {
									path: getAbsoluteUrl(window.location.pathname),
									mode: value,
								});
								setSyncTooltipFilterMode(value as SyncTooltipFilterMode);
							}}
							items={[
								{
									value: SyncTooltipFilterMode.All,
									label: t('dashboard_page_v2.settings.cross_panel_sync.all'),
								},
								{
									value: SyncTooltipFilterMode.Filtered,
									label: t('dashboard_page_v2.settings.cross_panel_sync.filtered'),
								},
							]}
						/>
					</div>
				)}
			</Col>
			{numberOfUnsavedChanges > 0 && (
				<div className={styles.overviewSettingsFooter}>
					<div className={styles.unsaved}>
						<div className={styles.unsavedDot} />
						<Typography.Text className={styles.unsavedChanges}>
							{t('dashboard_page_v2.settings.unsaved_changes', {
								count: numberOfUnsavedChanges,
							})}
						</Typography.Text>
					</div>
					<div className={styles.footerActionBtns}>
						<Button
							disabled={updateDashboardMutation.isLoading}
							icon={<X size={14} />}
							onClick={discardHandler}
							type="text"
							className={styles.discardBtn}
						>
							{t('dashboard_page_v2.settings.discard')}
						</Button>
						<Button
							style={{
								margin: '16px 0',
							}}
							disabled={updateDashboardMutation.isLoading}
							loading={updateDashboardMutation.isLoading}
							icon={<Check size={14} />}
							data-testid="save-dashboard-config"
							onClick={onSaveHandler}
							type="primary"
							className={styles.saveBtn}
						>
							{t('save', { ns: 'common' })}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default GeneralDashboardSettings;
