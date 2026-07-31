import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SolidAlertTriangle, X } from '@signozhq/icons';
import { Badge } from '@signozhq/ui/badge';
import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { Divider } from '@signozhq/ui/divider';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import HeaderRightSection from 'components/HeaderRightSection/HeaderRightSection';
import { useConfirmableAction } from 'hooks/useConfirmableAction';
import { DashboardDetailEvents } from 'pages/DashboardPageV2/constants/events';

import DisabledControlTooltip from '../../components/DisabledControlTooltip/DisabledControlTooltip';
import styles from './Header.module.scss';

interface HeaderProps {
	/** Unsaved edits exist — shows the "Unsaved Changes" badge and gates the discard confirmation on close (not the Save button). */
	isDirty: boolean;
	isSaving: boolean;
	showSwitchToView?: boolean;
	/** Locked/no-permission dashboard — Save is disabled with a reason. */
	readOnly?: boolean;
	readOnlyReason?: string;
	onSave: () => void;
	onSwitchToView?: () => void;
	onClose: () => void;
}

function Header({
	isDirty,
	isSaving,
	showSwitchToView = false,
	readOnly = false,
	readOnlyReason,
	onSave,
	onSwitchToView,
	onClose,
}: HeaderProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const discard = useConfirmableAction(
		useCallback(async (): Promise<void> => {
			// Only reachable after confirming a discard, which is gated on unsaved edits.
			void logEvent(DashboardDetailEvents.PanelEditorDiscarded, {
				wasDirty: true,
			});
			onClose();
		}, [onClose]),
	);

	// Confirm before closing with unsaved edits; a pristine panel closes straight away.
	const handleCloseClick = useCallback((): void => {
		if (isDirty) {
			discard.request();
		} else {
			onClose();
		}
	}, [isDirty, onClose, discard]);

	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<Button
					variant="ghost"
					color="secondary"
					size="icon"
					suffix={<X size={14} />}
					data-testid="panel-editor-v2-close"
					onClick={handleCloseClick}
				/>
				<Divider type="vertical" />
				<Typography.Text>
					{t('dashboard_page_v2.panel_editor.configure_panel')}
				</Typography.Text>
				{isDirty && (
					<Badge color="warning" data-testid="panel-editor-v2-unsaved-badge">
						{t('dashboard_page_v2.panel_editor.unsaved_changes')}
					</Badge>
				)}
			</div>
			<div className={styles.actions}>
				<HeaderRightSection
					enableAnnouncements={false}
					enableShare={false}
					enableFeedback={false}
				/>
				{showSwitchToView && (
					<Button
						variant="outlined"
						color="secondary"
						data-testid="panel-editor-v2-switch-to-view"
						onClick={onSwitchToView}
					>
						{t('dashboard_page_v2.panel_editor.switch_to_view_mode')}
					</Button>
				)}
				<DisabledControlTooltip reason={readOnlyReason ?? ''} disabled={readOnly}>
					<Button
						variant="solid"
						color="primary"
						data-testid="panel-editor-v2-save"
						disabled={readOnly || isSaving}
						loading={!readOnly && isSaving}
						onClick={readOnly ? undefined : onSave}
					>
						{t('dashboard_page_v2.panel_editor.save_changes')}
					</Button>
				</DisabledControlTooltip>
			</div>

			<DialogWrapper
				open={discard.open}
				onOpenChange={(next: boolean): void => {
					if (!next) {
						discard.cancel();
					}
				}}
				title={t('dashboard_page_v2.panel_editor.discard_title')}
				titleIcon={<SolidAlertTriangle size={14} color="#fdd600" />}
				testId="panel-editor-v2-discard-modal"
				footer={
					<>
						<Button
							type="button"
							variant="solid"
							color="destructive"
							data-testid="panel-editor-v2-discard-confirm"
							loading={discard.isPending}
							onClick={discard.confirm}
						>
							{t('dashboard_page_v2.panel_editor.discard')}
						</Button>
						<Button
							type="button"
							variant="outlined"
							color="secondary"
							data-testid="panel-editor-v2-discard-cancel"
							onClick={discard.cancel}
						>
							{t('dashboard_page_v2.panel_editor.keep_editing')}
						</Button>
					</>
				}
			>
				<Typography>
					{t('dashboard_page_v2.panel_editor.discard_description')}
				</Typography>
			</DialogWrapper>
		</div>
	);
}

export default Header;
