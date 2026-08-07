import { Configure, Plus } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';

import dashboardEmojiUrl from '@/assets/Icons/dashboard_emoji.svg';
import landscapeUrl from '@/assets/Icons/landscape.svg';

import { useCreatePanel } from '../../hooks/useCreatePanel';
import { useDashboardStore } from '../../store/useDashboardStore';
import PanelTypeSelectionModal from '../Panel/PanelTypeSelectionModal/PanelTypeSelectionModal';
import styles from './DashboardEmptyState.module.scss';

interface DashboardEmptyStateProps {
	canAddPanel: boolean;
}

function DashboardEmptyState({
	canAddPanel,
}: DashboardEmptyStateProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const { isPickerOpen, openPicker, closePicker, createPanel } =
		useCreatePanel();
	const isEditable = useDashboardStore((s) => s.isEditable);
	const requestSettings = useDashboardStore((s) => s.requestSettings);

	return (
		<section className={styles.emptyState}>
			<div className={styles.content}>
				<div className={styles.heading}>
					<img src={dashboardEmojiUrl} alt="" className={styles.emoji} />
					<Typography.Text className={styles.welcome}>
						{t('dashboard_empty_state.welcome')}
					</Typography.Text>
					<Typography.Text className={styles.welcomeInfo}>
						{t('dashboard_empty_state.follow_steps')}
					</Typography.Text>
				</div>

				<div className={styles.steps}>
					<div className={styles.step}>
						<div className={styles.stepText}>
							<Configure size={14} className={styles.stepIcon} />
							<div className={styles.stepCopy}>
								<Typography.Text className={styles.stepTitle}>
									{t('dashboard_empty_state.configure_title')}
								</Typography.Text>
								<Typography.Text className={styles.stepInfo}>
									{t('dashboard_empty_state.configure_desc')}
								</Typography.Text>
							</div>
						</div>
						{isEditable && (
							<Button
								variant="solid"
								color="secondary"
								prefix={<Configure size="md" />}
								onClick={(): void => requestSettings({ tab: 'Overview' })}
								testId="empty-configure"
							>
								{t('dashboard_empty_state.configure_btn')}
							</Button>
						)}
					</div>

					<div className={styles.step}>
						<div className={styles.stepText}>
							<img src={landscapeUrl} alt="" className={styles.stepIcon} />
							<div className={styles.stepCopy}>
								<Typography.Text className={styles.stepTitle}>
									{t('dashboard_empty_state.add_panels')}
								</Typography.Text>
								<Typography.Text className={styles.stepInfo}>
									{t('dashboard_empty_state.add_panels_desc')}
								</Typography.Text>
							</div>
						</div>
						{canAddPanel && (
							<Button
								color="primary"
								prefix={<Plus size="md" />}
								onClick={(): void => openPicker()}
								testId="add-panel"
							>
								{t('dashboard_empty_state.new_panel_btn')}
							</Button>
						)}
					</div>
				</div>
			</div>
			<PanelTypeSelectionModal
				open={isPickerOpen}
				onClose={closePicker}
				onSelect={createPanel}
			/>
		</section>
	);
}

export default DashboardEmptyState;
