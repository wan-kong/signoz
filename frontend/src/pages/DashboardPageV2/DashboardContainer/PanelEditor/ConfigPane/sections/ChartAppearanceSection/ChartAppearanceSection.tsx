import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import {
	DashboardtypesFillModeDTO,
	DashboardtypesLineInterpolationDTO,
	DashboardtypesLineStyleDTO,
} from 'api/generated/services/sigNoz.schemas';
import type {
	SectionEditorProps,
	SectionKind,
} from 'pages/DashboardPageV2/DashboardContainer/Panels/types/sections';

import ConfigSegmented from '../../controls/ConfigSegmented/ConfigSegmented';
import ConfigSelect from '../../controls/ConfigSelect/ConfigSelect';
import ConfigSwitch from '../../controls/ConfigSwitch/ConfigSwitch';
import { SegmentIcon } from '../../controls/segmentIcons';
import type { SectionEditorContext } from '../../sectionContext';
import DisconnectValuesField from './DisconnectValuesField';

import styles from './ChartAppearanceSection.module.scss';

const LINE_STYLE_OPTIONS = [
	{
		value: DashboardtypesLineStyleDTO.solid,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.solid',
		icon: 'solid-line' as const,
	},
	{
		value: DashboardtypesLineStyleDTO.dashed,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.dashed',
		icon: 'dashed-line' as const,
	},
];

const LINE_INTERPOLATION_OPTIONS = [
	{
		value: DashboardtypesLineInterpolationDTO.linear,
		labelKey: 'dashboard_page_v2.panel_config.axes.linear',
		icon: <SegmentIcon name="interp-linear" />,
	},
	{
		value: DashboardtypesLineInterpolationDTO.spline,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.spline',
		icon: <SegmentIcon name="interp-spline" />,
	},
	{
		value: DashboardtypesLineInterpolationDTO.step_before,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.step_before',
		icon: <SegmentIcon name="interp-step-before" />,
	},
	{
		value: DashboardtypesLineInterpolationDTO.step_after,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.step_after',
		icon: <SegmentIcon name="interp-step-after" />,
	},
];

const FILL_MODE_OPTIONS = [
	{
		value: DashboardtypesFillModeDTO.none,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.none',
		icon: 'fill-none' as const,
	},
	{
		value: DashboardtypesFillModeDTO.solid,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.solid',
		icon: 'fill-solid' as const,
	},
	{
		value: DashboardtypesFillModeDTO.gradient,
		labelKey: 'dashboard_page_v2.panel_config.chart_appearance.gradient',
		icon: 'fill-gradient' as const,
	},
];

/**
 * Edits the `chartAppearance` slice of a TimeSeries panel spec: line style /
 * interpolation, fill mode, point markers, and the connect-null-gaps threshold. Each
 * control is gated by its `controls` flag.
 */
function ChartAppearanceSection({
	value,
	controls,
	onChange,
	stepInterval,
}: SectionEditorProps<SectionKind.ChartAppearance> &
	Pick<SectionEditorContext, 'stepInterval'>): JSX.Element {
	const { t } = useTranslation('dashboard');
	const lineStyleOptions = LINE_STYLE_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));
	const lineInterpolationOptions = LINE_INTERPOLATION_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));
	const fillModeOptions = FILL_MODE_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));

	return (
		<>
			{controls.lineStyle && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.chart_appearance.line_style')}
					</Typography.Text>
					<ConfigSegmented
						testId="panel-editor-v2-line-style"
						value={value?.lineStyle}
						items={lineStyleOptions}
						onChange={(next): void =>
							onChange({ ...value, lineStyle: next as DashboardtypesLineStyleDTO })
						}
					/>
				</div>
			)}

			{controls.lineInterpolation && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.chart_appearance.line_interpolation')}
					</Typography.Text>
					<ConfigSelect
						testId="panel-editor-v2-line-interpolation"
						placeholder={t(
							'dashboard_page_v2.panel_config.chart_appearance.select_interpolation',
						)}
						value={value?.lineInterpolation}
						items={lineInterpolationOptions}
						onChange={(next): void =>
							onChange({
								...value,
								lineInterpolation: next,
							})
						}
					/>
				</div>
			)}

			{controls.fillMode && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.chart_appearance.fill_mode')}
					</Typography.Text>
					<ConfigSegmented
						testId="panel-editor-v2-fill-mode"
						value={value?.fillMode}
						items={fillModeOptions}
						onChange={(next): void =>
							onChange({ ...value, fillMode: next as DashboardtypesFillModeDTO })
						}
					/>
				</div>
			)}

			{controls.showPoints && (
				<ConfigSwitch
					testId="panel-editor-v2-show-points"
					title={t('dashboard_page_v2.panel_config.chart_appearance.show_points')}
					description={t(
						'dashboard_page_v2.panel_config.chart_appearance.show_points_description',
					)}
					value={value?.showPoints ?? false}
					onChange={(checked): void => onChange({ ...value, showPoints: checked })}
				/>
			)}

			{controls.spanGaps && (
				<DisconnectValuesField
					testId="panel-editor-v2-span-gaps"
					value={value?.spanGaps}
					stepInterval={stepInterval}
					onChange={(spanGaps): void => onChange({ ...value, spanGaps })}
				/>
			)}
		</>
	);
}

export default ChartAppearanceSection;
