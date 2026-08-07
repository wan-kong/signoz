import i18n from 'ReactI18';
import { Badge } from '@signozhq/ui/badge';
import { Typography } from '@signozhq/ui/typography';
import type { TableColumnDef } from 'components/TanStackTableView';

import MapToBillingModelSelect from 'container/LLMObservability/Settings/ModelPricing/UnpricedModelsTab/components/MapToBillingModelSelect';
import type {
	PricingRule,
	UnpricedModel,
} from 'container/LLMObservability/Settings/ModelPricing/types';
import { formatSpanCount } from 'container/LLMObservability/Settings/ModelPricing/utils';
import styles from './tableConfig.module.scss';

export interface UnpricedColumnsConfig {
	canManage: boolean;
	// Picking a billing model requests a mapping — the tab opens a confirm dialog
	// and commits that single mapping there (no batch/selection state here).
	onRequestMap: (model: UnpricedModel, rule: PricingRule) => void;
	// Opens the add-cost drawer prefilled with the row's model name.
	onCreateNew: (modelName: string) => void;
}

// Column definitions for the unpriced-models TanStackTable. Sorting is off — the
// unmapped-models endpoint returns the full set in one shot with no ordering knob.
// Each row's action is self-contained: pick a billing model to map onto (confirmed
// in a dialog) or create pricing for the model, so there's no bulk-save column.
export function getUnpricedModelsColumns({
	canManage,
	onRequestMap,
	onCreateNew,
}: UnpricedColumnsConfig): TableColumnDef<UnpricedModel>[] {
	return [
		{
			id: 'model',
			header: i18n.t('unpriced_table.column_model', 'Model (from spans)', {
				ns: 'llm_unpriced',
			}),
			accessorFn: (row): string => row.modelName,
			width: { min: 240, default: '100%' },
			enableMove: false,
			enableRemove: false,
			cell: ({ row }): JSX.Element => (
				<Typography.Text
					weight="semibold"
					truncate={1}
					testId={`unpriced-model-name-${row.modelName}`}
				>
					{row.modelName}
				</Typography.Text>
			),
		},
		{
			id: 'provider',
			header: i18n.t('unpriced_table.column_provider', 'Provider', {
				ns: 'llm_unpriced',
			}),
			width: { min: 140 },
			enableMove: false,
			cell: ({ row }): string =>
				row.provider ||
				i18n.t('unpriced_table.provider_unknown', 'Unknown', {
					ns: 'llm_unpriced',
				}),
		},
		{
			id: 'spans',
			header: i18n.t('unpriced_table.column_spans', 'Spans', {
				ns: 'llm_unpriced',
			}),
			width: { min: 100 },
			enableMove: false,
			cell: ({ row }): JSX.Element => (
				<Badge
					color="cherry"
					variant="outline"
					className={styles.spansBadge}
					data-testid={`unpriced-spans-${row.modelName}`}
				>
					{formatSpanCount(row.spanCount)}
				</Badge>
			),
		},
		{
			id: 'mapTo',
			header: i18n.t('unpriced_table.column_map_to', 'Map to billing model', {
				ns: 'llm_unpriced',
			}),
			width: { min: 280, default: '100%' },
			enableMove: false,
			enableRemove: false,
			cell: ({ row }): JSX.Element => (
				<MapToBillingModelSelect
					modelName={row.modelName}
					disabled={!canManage}
					onSelect={(rule): void => onRequestMap(row, rule)}
					onCreateNew={(): void => onCreateNew(row.modelName)}
				/>
			),
		},
	];
}
