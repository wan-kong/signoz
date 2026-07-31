import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import type {
	SectionEditorProps,
	SectionKind,
} from 'pages/DashboardPageV2/DashboardContainer/Panels/types/sections';
import { EQueryType } from 'types/common/dashboard';

import ConfigSelect from '../../controls/ConfigSelect/ConfigSelect';
import ConfigSwitch from '../../controls/ConfigSwitch/ConfigSwitch';
import PanelTypeSwitcher from '../../PanelTypeSwitcher/PanelTypeSwitcher';
import type { SectionEditorContext } from '../../sectionContext';
import { TIME_PREFERENCE_OPTIONS } from './timePreferenceOptions';

import styles from './VisualizationSection.module.scss';

type VisualizationSectionProps = SectionEditorProps<SectionKind.Visualization> &
	Pick<
		SectionEditorContext,
		'panelKind' | 'onChangePanelKind' | 'signal' | 'queryType'
	>;

/**
 * Edits the `visualization` slice: the panel-type switcher (`switchPanelKind`, every
 * kind), the per-panel time preference, bar stacking (`stackedBarChart`, Bar only), and
 * gap filling (`fillSpans`, TimeSeries only). Each control is gated by its `controls`
 * flag, so a kind only renders — and only writes — the fields its spec supports.
 */
function VisualizationSection({
	value,
	controls,
	onChange,
	panelKind,
	onChangePanelKind,
	queryType,
	signal,
}: VisualizationSectionProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const timePreferenceOptions = TIME_PREFERENCE_OPTIONS.map((option) => ({
		...option,
		label: t(option.labelKey),
	}));

	return (
		<>
			{controls.switchPanelKind && panelKind && onChangePanelKind && (
				<PanelTypeSwitcher
					panelKind={panelKind}
					// queryType is optional on the kind-erased section context, but always
					// supplied in practice; default to Query Builder at this boundary.
					queryType={queryType ?? EQueryType.QUERY_BUILDER}
					signal={signal}
					onChange={onChangePanelKind}
				/>
			)}

			{controls.timePreference && (
				<div className={styles.field}>
					<Typography.Text>
						{t('dashboard_page_v2.panel_config.visualization.panel_time_preference')}
					</Typography.Text>
					<ConfigSelect
						testId="panel-editor-v2-time-preference"
						placeholder={t(
							'dashboard_page_v2.panel_config.visualization.select_time_scope',
						)}
						value={value?.timePreference}
						items={timePreferenceOptions}
						onChange={(next): void =>
							onChange({
								...value,
								timePreference: next,
							})
						}
					/>
				</div>
			)}

			{controls.stacking && (
				<ConfigSwitch
					testId="panel-editor-v2-stacked-bar-chart"
					title={t('dashboard_page_v2.panel_config.visualization.stack_series')}
					description={t(
						'dashboard_page_v2.panel_config.visualization.stack_series_description',
					)}
					value={value?.stackedBarChart ?? false}
					onChange={(checked): void =>
						onChange({ ...value, stackedBarChart: checked })
					}
				/>
			)}

			{controls.fillSpans && (
				<ConfigSwitch
					testId="panel-editor-v2-fill-spans"
					title={t('dashboard_page_v2.panel_config.visualization.fill_gaps')}
					description={t(
						'dashboard_page_v2.panel_config.visualization.fill_gaps_description',
					)}
					value={value?.fillSpans ?? false}
					onChange={(checked): void => onChange({ ...value, fillSpans: checked })}
				/>
			)}
		</>
	);
}

export default VisualizationSection;
