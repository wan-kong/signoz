import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import { DashboardtypesPrecisionOptionDTO } from 'api/generated/services/sigNoz.schemas';
import YAxisUnitSelector from 'components/YAxisUnitSelector';
import { YAxisSource } from 'components/YAxisUnitSelector/types';
import type {
	SectionEditorProps,
	SectionKind,
} from 'pages/DashboardPageV2/DashboardContainer/Panels/types/sections';

import ConfigSelect from '../../controls/ConfigSelect/ConfigSelect';
import type { SectionEditorContext } from '../../sectionContext';
import ColumnUnits from './ColumnUnits';

import styles from './FormattingSection.module.scss';

type FormattingSectionProps = SectionEditorProps<SectionKind.Formatting> &
	Pick<SectionEditorContext, 'tableColumns' | 'metricUnit'>;

// `full` means "show the raw value, no rounding"; the digits round to that many places.
const DECIMAL_OPTIONS: {
	value: DashboardtypesPrecisionOptionDTO;
	labelKey: string;
}[] = [
	{
		value: DashboardtypesPrecisionOptionDTO.NUMBER_0,
		labelKey: 'dashboard_page_v2.panel_config.formatting.zero_decimals',
	},
	{
		value: DashboardtypesPrecisionOptionDTO.NUMBER_1,
		labelKey: 'dashboard_page_v2.panel_config.formatting.one_decimal',
	},
	{
		value: DashboardtypesPrecisionOptionDTO.NUMBER_2,
		labelKey: 'dashboard_page_v2.panel_config.formatting.two_decimals',
	},
	{
		value: DashboardtypesPrecisionOptionDTO.NUMBER_3,
		labelKey: 'dashboard_page_v2.panel_config.formatting.three_decimals',
	},
	{
		value: DashboardtypesPrecisionOptionDTO.NUMBER_4,
		labelKey: 'dashboard_page_v2.panel_config.formatting.four_decimals',
	},
	{
		value: DashboardtypesPrecisionOptionDTO.full,
		labelKey: 'dashboard_page_v2.panel_config.formatting.full',
	},
];

/**
 * Edits the `formatting` slice of a panel spec (unit + decimal precision). Which
 * controls show is driven by the per-kind `controls` flags; the spec slice itself
 * is uniform across every kind that declares the Formatting section.
 */
function FormattingSection({
	value,
	controls,
	onChange,
	tableColumns = [],
	metricUnit,
}: FormattingSectionProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const decimalOptions = DECIMAL_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));

	return (
		<>
			{controls.unit && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.formatting.unit')}
					</Typography.Text>
					<YAxisUnitSelector
						containerClassName={styles.unitSelector}
						data-testid="panel-editor-v2-unit"
						source={YAxisSource.DASHBOARDS}
						value={value?.unit}
						initialValue={metricUnit}
						onChange={(unit): void => onChange({ ...value, unit })}
					/>
				</div>
			)}

			{controls.decimals && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.formatting.decimals')}
					</Typography.Text>
					<ConfigSelect
						testId="panel-editor-v2-decimals"
						placeholder={t(
							'dashboard_page_v2.panel_config.formatting.select_decimals',
						)}
						value={value?.decimalPrecision}
						items={decimalOptions}
						onChange={(next): void =>
							onChange({
								...value,
								decimalPrecision: next,
							})
						}
					/>
				</div>
			)}

			{controls.columnUnits && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.formatting.column_units')}
					</Typography.Text>
					<ColumnUnits
						columns={tableColumns}
						value={value?.columnUnits ?? {}}
						metricUnit={metricUnit}
						onChange={(columnUnits): void => onChange({ ...value, columnUnits })}
					/>
				</div>
			)}
		</>
	);
}

export default FormattingSection;
