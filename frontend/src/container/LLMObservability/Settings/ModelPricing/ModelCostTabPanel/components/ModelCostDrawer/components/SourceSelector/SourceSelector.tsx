import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from '@signozhq/ui/button';
import { RadioGroup, RadioGroupItem } from '@signozhq/ui/radio-group';
import { Lock } from '@signozhq/icons';
import { Typography } from '@signozhq/ui/typography';
import cx from 'classnames';

import styles from './SourceSelector.module.scss';

interface SourceSelectorProps {
	isOverride: boolean;
	isReadOnly: boolean;
	disableAuto?: boolean;
	onChange: (isOverride: boolean) => void;
}

// Auto-populated vs user-override selector, with a confirm step before
// discarding custom values back to defaults.
function SourceSelector({
	isOverride,
	isReadOnly,
	disableAuto = false,
	onChange,
}: SourceSelectorProps): JSX.Element {
	const { t } = useTranslation('llm');
	const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

	const handleSourceChange = (value: 'auto' | 'override'): void => {
		if (value === 'auto' && isOverride) {
			setShowResetConfirm(true);
			return;
		}
		if (value === 'override' && !isOverride) {
			onChange(true);
		}
	};

	const confirmReset = (): void => {
		onChange(false);
		setShowResetConfirm(false);
	};

	return (
		<div className={cx(styles.drawerSection, styles.drawerSurface)}>
			<div className={styles.drawerSurfaceHead}>
				<Typography.Text weight="bold" size="base">
					{t('source_selector.title', 'Source')}
				</Typography.Text>

				{isReadOnly && (
					<span className={styles.managedLabel} data-testid="drawer-managed-label">
						<Lock size={12} />
						{t('source_selector.managed_by_signoz', 'Managed by SigNoz')}
					</span>
				)}
			</div>
			<RadioGroup
				value={isOverride ? 'override' : 'auto'}
				onChange={(value): void => handleSourceChange(value as 'auto' | 'override')}
				className={styles.sourceRadioGroup}
			>
				<RadioGroupItem
					value="auto"
					containerClassName={styles.sourceRadio}
					testId="drawer-source-auto"
					disabled={disableAuto}
				>
					<div className={styles.sourceRadioTitle}>
						{t('source_selector.auto_populated', 'Auto-populated')}
					</div>
					<div className={styles.sourceRadioDesc}>
						{disableAuto
							? t(
									'source_selector.auto_disabled_desc',
									'Available once SigNoz has default pricing for this model.',
								)
							: t('source_selector.auto_default_desc', 'Default pricing from SigNoz.')}
					</div>
				</RadioGroupItem>
				<RadioGroupItem
					value="override"
					containerClassName={styles.sourceRadio}
					testId="drawer-source-override"
				>
					<div className={styles.sourceRadioTitle}>
						{t('source_selector.user_override', 'User override')}
					</div>
					<div className={styles.sourceRadioDesc}>
						{t('source_selector.override_desc', 'Custom pricing. Takes precedence.')}
					</div>
				</RadioGroupItem>
			</RadioGroup>
			{showResetConfirm && (
				<div
					className={styles.resetConfirm}
					aria-label={t('source_selector.reset_aria', 'Reset to default pricing')}
				>
					<p>
						{t(
							'source_selector.reset_confirm_message',
							'Reset to default pricing? Custom values will be discarded. It might take 24 hours for changes to take effect.',
						)}
					</p>
					<div className={styles.resetConfirmActions}>
						<Button
							variant="outlined"
							color="secondary"
							onClick={(): void => setShowResetConfirm(false)}
							testId="drawer-reset-keep-btn"
						>
							{t('source_selector.keep', 'Keep')}
						</Button>
						<Button
							variant="solid"
							color="primary"
							onClick={confirmReset}
							testId="drawer-reset-confirm-btn"
						>
							{t('source_selector.reset', 'Reset')}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SourceSelector;
