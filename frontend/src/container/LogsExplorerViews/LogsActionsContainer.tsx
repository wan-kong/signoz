import { useState } from 'react';
import { Switch } from '@signozhq/ui/switch';
import { Typography } from '@signozhq/ui/typography';
import DownloadOptionsMenu from 'components/DownloadOptionsMenu/DownloadOptionsMenu';
import FieldsSelector from 'components/FieldsSelector';
import LogsFormatOptionsMenu from 'components/LogsFormatOptionsMenu/LogsFormatOptionsMenu';
import ListViewOrderBy from 'components/OrderBy/ListViewOrderBy';
import { LOCALSTORAGE } from 'constants/localStorage';
import { PANEL_TYPES } from 'constants/queryBuilder';
import { useOptionsMenu } from 'container/OptionsMenu';
import { LOGS_REQUIRED_COLUMNS } from 'container/OptionsMenu/constants';
import { ArrowUp10, Minus } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { DataSource, StringOperators } from 'types/common/queryBuilder';

function LogsActionsContainer({
	listQuery,
	selectedPanelType,
	showFrequencyChart,
	handleToggleFrequencyChart,
	orderBy,
	setOrderBy,
}: {
	listQuery: any;
	selectedPanelType: PANEL_TYPES;
	showFrequencyChart: boolean;
	handleToggleFrequencyChart: () => void;
	orderBy: string;
	setOrderBy: (value: string) => void;
}): JSX.Element {
	const { t } = useTranslation('logs');
	const { options, config } = useOptionsMenu({
		storageKey: LOCALSTORAGE.LOGS_LIST_OPTIONS,
		dataSource: DataSource.LOGS,
		aggregateOperator: listQuery?.aggregateOperator || StringOperators.NOOP,
	});

	const [isFieldsSelectorOpen, setIsFieldsSelectorOpen] = useState(false);

	const formatItems = [
		{
			key: 'raw',
			label: t('view_modes.raw'),
			data: {
				title: t('controls.max_lines_per_row_lower'),
			},
		},
		{
			key: 'list',
			label: t('view_modes.default'),
		},
		{
			key: 'table',
			label: t('view_modes.column'),
			data: {
				title: t('controls.columns'),
			},
		},
	];

	return (
		<div className="logs-actions-container">
			<div className="tab-options">
				<div className="tab-options-left">
					{selectedPanelType === PANEL_TYPES.LIST && (
						<div className="frequency-chart-view-controller">
							<Typography>{t('controls.frequency_chart')}</Typography>
							<Switch
								value={showFrequencyChart}
								defaultValue
								onChange={handleToggleFrequencyChart}
							/>
						</div>
					)}
				</div>

				<div className="tab-options-right">
					{selectedPanelType === PANEL_TYPES.LIST && (
						<>
							<div className="order-by-container">
								<div className="order-by-label">
									{t('controls.order_by')} <Minus size={14} /> <ArrowUp10 size={14} />
								</div>

								<ListViewOrderBy
									value={orderBy}
									onChange={(value): void => setOrderBy(value)}
									dataSource={DataSource.LOGS}
								/>
							</div>
							<div className="download-options-container">
								<DownloadOptionsMenu
									dataSource={DataSource.LOGS}
									selectedColumns={options?.selectColumns}
								/>
							</div>
							<div className="format-options-container">
								<LogsFormatOptionsMenu
									items={formatItems}
									selectedOptionFormat={options.format}
									config={config}
									onOpenColumns={(): void => setIsFieldsSelectorOpen(true)}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			{config.fieldsSelector && (
				<FieldsSelector
					isOpen={isFieldsSelectorOpen}
					title={t('controls.edit_columns')}
					fields={config.fieldsSelector.value}
					onFieldsChange={config.fieldsSelector.onFieldsChange}
					onClose={(): void => setIsFieldsSelectorOpen(false)}
					signal={DataSource.LOGS}
					requiredFields={LOGS_REQUIRED_COLUMNS}
				/>
			)}
		</div>
	);
}

export default LogsActionsContainer;
