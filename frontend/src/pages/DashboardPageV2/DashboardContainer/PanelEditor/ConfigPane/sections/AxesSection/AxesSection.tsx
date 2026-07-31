import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';
import { Input } from 'antd';
import type {
	SectionEditorProps,
	SectionKind,
} from 'pages/DashboardPageV2/DashboardContainer/Panels/types/sections';

import ConfigSegmented from '../../controls/ConfigSegmented/ConfigSegmented';

import styles from './AxesSection.module.scss';

type SoftBound = 'softMin' | 'softMax';

const SCALE_OPTIONS = [
	{
		value: 'linear',
		labelKey: 'dashboard_page_v2.panel_config.axes.linear',
		icon: 'scale-linear' as const,
	},
	{
		value: 'log',
		labelKey: 'dashboard_page_v2.panel_config.axes.log',
		icon: 'scale-log' as const,
	},
];

/**
 * Edits the `axes` slice of a panel spec: soft Y-axis min/max bounds and the
 * linear/logarithmic scale toggle. Each control is gated by its `controls` flag.
 */
function AxesSection({
	value,
	controls,
	onChange,
}: SectionEditorProps<SectionKind.Axes>): JSX.Element {
	const { t } = useTranslation('dashboard');
	const scaleOptions = SCALE_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));

	// An empty field clears the bound (null); otherwise parse to a number, ignoring
	// transient non-numeric input (e.g. a lone "-") by leaving the bound unset.
	const handleBound =
		(bound: SoftBound) =>
		(e: ChangeEvent<HTMLInputElement>): void => {
			const raw = e.target.value;
			const next = raw === '' || Number.isNaN(Number(raw)) ? null : Number(raw);
			onChange({ ...value, [bound]: next });
		};

	return (
		<>
			{controls.minMax && (
				<div className={styles.bounds}>
					<div className={styles.field}>
						<Typography.Text>
							{t('dashboard_page_v2.panel_config.axes.soft_min')}
						</Typography.Text>
						<Input
							data-testid="panel-editor-v2-soft-min"
							type="number"
							placeholder={t('dashboard_page_v2.panel_config.axes.auto')}
							value={value?.softMin ?? ''}
							onChange={handleBound('softMin')}
						/>
					</div>
					<div className={styles.field}>
						<Typography.Text>
							{t('dashboard_page_v2.panel_config.axes.soft_max')}
						</Typography.Text>
						<Input
							data-testid="panel-editor-v2-soft-max"
							type="number"
							placeholder={t('dashboard_page_v2.panel_config.axes.auto')}
							value={value?.softMax ?? ''}
							onChange={handleBound('softMax')}
						/>
					</div>
				</div>
			)}

			{controls.logScale && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.axes.y_axis_scale')}
					</Typography.Text>
					<ConfigSegmented
						testId="panel-editor-v2-log-scale"
						value={value?.isLogScale ? 'log' : 'linear'}
						items={scaleOptions}
						onChange={(next): void =>
							onChange({ ...value, isLogScale: next === 'log' })
						}
					/>
				</div>
			)}
		</>
	);
}

export default AxesSection;
