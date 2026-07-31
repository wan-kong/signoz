import { useEffect, useState } from 'react';
import { rangeUtil } from '@grafana/data';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import type { DashboardtypesSpanGapsDTO } from 'api/generated/services/sigNoz.schemas';

import ConfigSegmented from '../../controls/ConfigSegmented/ConfigSegmented';
import DisconnectValuesThresholdInput from './DisconnectValuesThresholdInput';

import styles from './ChartAppearanceSection.module.scss';

const DEFAULT_THRESHOLD = '1m';
enum DisconnectValuesMode {
	NEVER = 'never',
	THRESHOLD = 'threshold',
}
const MODE_OPTIONS = [
	{
		value: DisconnectValuesMode.NEVER,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.never',
	},
	{
		value: DisconnectValuesMode.THRESHOLD,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.threshold',
	},
];

interface DisconnectValuesFieldProps {
	testId: string;
	value: DashboardtypesSpanGapsDTO | undefined;
	/** Query step interval (seconds): seeds the default threshold and floors it. */
	stepInterval?: number;
	onChange: (next: DashboardtypesSpanGapsDTO | undefined) => void;
}

/** Default threshold duration: the step interval (smallest meaningful), else 1m. */
function defaultDuration(stepInterval?: number): string {
	return stepInterval && stepInterval > 0
		? rangeUtil.secondsToHms(stepInterval)
		: DEFAULT_THRESHOLD;
}

/**
 * "Disconnect values": Never (span every gap — the chart default) vs Threshold
 * (only bridge gaps shorter than a duration). The threshold persists as a
 * duration string in `spanGaps.fillLessThan` ("10m", "5s") — the wire format the
 * backend expects.
 */
function DisconnectValuesField({
	testId,
	value,
	stepInterval,
	onChange,
}: DisconnectValuesFieldProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const duration = value?.fillLessThan || undefined;
	const modeOptions = MODE_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));
	// `fillOnlyBelow` is authoritative; fall back to a stored duration for legacy panels.
	const isThreshold = value?.fillOnlyBelow ?? !!duration;
	// Remember the last committed threshold so Never → Threshold restores it.
	const [lastDuration, setLastDuration] = useState<string | undefined>(duration);

	useEffect(() => {
		if (duration) {
			setLastDuration(duration);
		}
	}, [duration]);

	const handleMode = (mode: DisconnectValuesMode): void => {
		if (mode === DisconnectValuesMode.THRESHOLD) {
			onChange({
				...value,
				fillOnlyBelow: true,
				// Seed from the live stepInterval (async — undefined until results load), not mount.
				fillLessThan: lastDuration ?? defaultDuration(stepInterval),
			});
			return;
		}
		// Never spans every gap; drop the duration so the renderer reads a clean "span all".
		onChange({ ...value, fillOnlyBelow: false, fillLessThan: undefined });
	};

	return (
		<>
			<div className={styles.field}>
				<Typography.Text>
					{t('dashboard_page_v2.panel_config.chart_appearance.disconnect_values')}
				</Typography.Text>
				<ConfigSegmented
					testId={testId}
					value={
						isThreshold ? DisconnectValuesMode.THRESHOLD : DisconnectValuesMode.NEVER
					}
					items={modeOptions}
					onChange={handleMode}
				/>
			</div>
			{isThreshold && duration && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.chart_appearance.threshold_value')}
					</Typography.Text>
					<DisconnectValuesThresholdInput
						testId={`${testId}-value`}
						value={duration}
						minValue={stepInterval}
						onChange={(next): void =>
							onChange({ ...value, fillOnlyBelow: true, fillLessThan: next })
						}
					/>
				</div>
			)}
		</>
	);
}

export default DisconnectValuesField;
