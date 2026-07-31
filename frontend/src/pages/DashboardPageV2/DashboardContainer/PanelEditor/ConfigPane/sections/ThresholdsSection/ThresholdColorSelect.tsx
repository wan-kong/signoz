import { ChevronDown } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { ColorPicker } from 'antd';
import { ThresholdColor } from 'pages/DashboardPageV2/DashboardContainer/Panels/types/threshold';

import styles from './ThresholdsSection.module.scss';

interface ThresholdColorSelectProps {
	value: string;
	testId?: string;
	onChange: (hex: string) => void;
}

// Named presets from the SigNoz palette (cherry / amber / forest / robin). They surface
// as quick swatches in the picker; the full picker below covers any custom color.
const PRESETS: { label: string; value: ThresholdColor }[] = [
	{
		label: 'dashboard_page_v2.panel_config.thresholds.colors.red',
		value: ThresholdColor.RED,
	},
	{
		label: 'dashboard_page_v2.panel_config.thresholds.colors.orange',
		value: ThresholdColor.ORANGE,
	},
	{
		label: 'dashboard_page_v2.panel_config.thresholds.colors.green',
		value: ThresholdColor.GREEN,
	},
	{
		label: 'dashboard_page_v2.panel_config.thresholds.colors.blue',
		value: ThresholdColor.BLUE,
	},
];

/**
 * Threshold color control: an antd ColorPicker with the palette presets plus a full
 * custom picker, in a single popover (so moving from the trigger into the picker never
 * dismisses it). The trigger shows the current swatch and its preset name, or "Custom".
 */
function ThresholdColorSelect({
	value,
	testId,
	onChange,
}: ThresholdColorSelectProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const current = PRESETS.find(
		(p) => p.value.toLowerCase() === value?.toLowerCase(),
	);

	return (
		<ColorPicker
			value={value}
			onChangeComplete={(c): void => onChange(c.toHexString())}
			presets={[
				{
					label: t('dashboard_page_v2.panel_config.thresholds.colors.defaults'),
					colors: PRESETS.map((p) => p.value),
				},
			]}
		>
			<button type="button" className={styles.colorTrigger} data-testid={testId}>
				<span className={styles.dot} style={{ backgroundColor: value }} />
				<span className={styles.colorLabel}>
					{current
						? t(current.label)
						: t('dashboard_page_v2.panel_config.thresholds.colors.custom')}
				</span>
				<ChevronDown size={13} />
			</button>
		</ColorPicker>
	);
}

export default ThresholdColorSelect;
