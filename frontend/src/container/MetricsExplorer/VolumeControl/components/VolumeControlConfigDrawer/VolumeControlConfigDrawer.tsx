import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { DrawerWrapper } from '@signozhq/ui/drawer';
import { Typography } from '@signozhq/ui/typography';
import { MetricreductionruletypesGettableReductionRuleDTO } from 'api/generated/services/sigNoz.schemas';

import { useVolumeControlConfig } from '../../hooks/useVolumeControlConfig';
import ImpactPanel from './ImpactPanel/ImpactPanel';
import LabelSelector from './LabelSelector/LabelSelector';
import ModeSelector from './ModeSelector/ModeSelector';
import RelatedAssetsWarning from './RelatedAssetsWarning/RelatedAssetsWarning';
import styles from './VolumeControlConfigDrawer.module.scss';

interface VolumeControlConfigDrawerProps {
	metricName: string;
	existingRule: MetricreductionruletypesGettableReductionRuleDTO | null;
	open: boolean;
	onClose: () => void;
}

function VolumeControlConfigDrawer({
	metricName,
	existingRule,
	open,
	onClose,
}: VolumeControlConfigDrawerProps): JSX.Element {
	const { t } = useTranslation('common');
	const {
		mode,
		setMode,
		labels,
		setLabels,
		attributeKeys,
		isLoadingAttributes,
		preview,
		isPreviewLoading,
		save,
		remove,
		isSaving,
		isRemoving,
		hasExistingRule,
		isSaveDisabled,
	} = useVolumeControlConfig({ metricName, existingRule, open, onClose });

	const footer = (
		<div className={styles.footer}>
			<Typography.Text size="small" color="muted">
				{t(
					'volume_control.changes_take_effect',
					'Changes take effect about 5 minutes after saving.',
				)}
			</Typography.Text>
			<div className={styles.footerSpacer} />
			<Button
				variant="outlined"
				color="secondary"
				onClick={onClose}
				data-testid="volume-control-cancel"
			>
				{t('cancel', 'Cancel')}
			</Button>
			{hasExistingRule && (
				<Button
					variant="ghost"
					color="destructive"
					onClick={remove}
					loading={isRemoving}
					data-testid="volume-control-remove"
				>
					{t('volume_control.remove_rule', 'Remove rule')}
				</Button>
			)}
			<Button
				variant="solid"
				color="primary"
				onClick={save}
				disabled={isSaveDisabled}
				loading={isSaving}
				data-testid="volume-control-save"
			>
				{t('volume_control.save_rule', 'Save rule')}
			</Button>
		</div>
	);

	return (
		<DrawerWrapper
			open={open}
			onOpenChange={(next: boolean): void => {
				if (!next) {
					onClose();
				}
			}}
			title={t(
				'volume_control.manage_attributes',
				'Manage attributes · {{metricName}}',
				{
					metricName,
				},
			)}
			direction="right"
			showCloseButton
			width="wide"
			footer={footer}
			showOverlay={false}
			className="volume-control-config-drawer"
			style={{ zIndex: 1100 }}
		>
			<div className={styles.body} data-testid="volume-control-config-drawer">
				<div className={styles.adminRow}>
					<Typography.Text
						size="xs"
						weight="semibold"
						color="warning"
						className={styles.adminOnlyTag}
					>
						{t('volume_control.admin_only', 'Admin only')}
					</Typography.Text>
				</div>
				<ModeSelector mode={mode} onChange={setMode} />
				{mode !== 'all' && (
					<LabelSelector
						mode={mode}
						options={attributeKeys}
						value={labels}
						onChange={setLabels}
						loading={isLoadingAttributes}
					/>
				)}
				<ImpactPanel mode={mode} preview={preview} isLoading={isPreviewLoading} />
				<RelatedAssetsWarning affectedAssets={preview?.affectedAssets} />
			</div>
		</DrawerWrapper>
	);
}

export default VolumeControlConfigDrawer;
