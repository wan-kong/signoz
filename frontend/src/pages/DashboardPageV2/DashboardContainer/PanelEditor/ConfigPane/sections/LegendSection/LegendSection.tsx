import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import { DashboardtypesLegendPositionDTO } from 'api/generated/services/sigNoz.schemas';
import type {
	SectionEditorProps,
	SectionKind,
} from 'pages/DashboardPageV2/DashboardContainer/Panels/types/sections';

import ConfigSegmented from '../../controls/ConfigSegmented/ConfigSegmented';
import LegendColors from '../../controls/LegendColors/LegendColors';
import type { SectionEditorContext } from '../../sectionContext';

import styles from './LegendSection.module.scss';

type LegendSectionProps = SectionEditorProps<SectionKind.Legend> &
	Pick<SectionEditorContext, 'legendSeries'>;

const POSITION_OPTIONS = [
	{
		value: DashboardtypesLegendPositionDTO.bottom,
		labelKey: 'dashboard_page_v2.panel_config.legend.bottom',
		icon: 'pos-bottom' as const,
	},
	{
		value: DashboardtypesLegendPositionDTO.right,
		labelKey: 'dashboard_page_v2.panel_config.legend.right',
		icon: 'pos-right' as const,
	},
];

/**
 * Edits the `legend` slice of a panel spec: legend position and per-series color
 * overrides. The colors control reads the panel's resolved series from context (the
 * shared preview query) and writes `customColors` keyed by series label.
 */
function LegendSection({
	value,
	controls,
	onChange,
	legendSeries,
}: LegendSectionProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const positionOptions = POSITION_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));

	return (
		<>
			{controls.position && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.legend.position')}
					</Typography.Text>
					<ConfigSegmented
						testId="panel-editor-v2-legend-position"
						items={positionOptions}
						value={value?.position}
						onChange={(next): void =>
							onChange({
								...value,
								position: next as DashboardtypesLegendPositionDTO,
							})
						}
					/>
				</div>
			)}

			{controls.colors && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.legend.series_colors')}
					</Typography.Text>
					<LegendColors
						series={legendSeries ?? []}
						value={value?.customColors}
						onChange={(customColors): void => onChange({ ...value, customColors })}
					/>
				</div>
			)}
		</>
	);
}

export default LegendSection;
