import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Popover, Tooltip } from 'antd';
import { RadioGroup, RadioGroupItem } from '@signozhq/ui/radio-group';
import { Typography } from '@signozhq/ui/typography';
import { TelemetryFieldKey } from 'api/v5/v5';
import { PANEL_TYPES } from 'constants/queryBuilder';
import { useExportRawData } from 'hooks/useExportData/useServerExport';
import { Download, LoaderCircle } from '@signozhq/icons';
import { DataSource } from 'types/common/queryBuilder';

import {
	DownloadColumnsScopes,
	DownloadFormats,
	DownloadRowCounts,
} from './constants';

import './DownloadOptionsMenu.styles.scss';

interface DownloadOptionsMenuProps {
	dataSource: DataSource;
	selectedColumns?: TelemetryFieldKey[];
	panelType?: PANEL_TYPES;
}

export default function DownloadOptionsMenu({
	dataSource,
	selectedColumns,
	panelType,
}: DownloadOptionsMenuProps): JSX.Element {
	const { t: translate } = useTranslation('common');
	const t = (key: string): string => String(translate(key));
	const [exportFormat, setExportFormat] = useState<string>(DownloadFormats.CSV);
	const [rowLimit, setRowLimit] = useState<number>(DownloadRowCounts.TEN_K);
	const [columnsScope, setColumnsScope] = useState<string>(
		DownloadColumnsScopes.ALL,
	);
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

	const { isDownloading, handleExportRawData } = useExportRawData({
		dataSource,
		panelType,
	});

	const handleExport = useCallback(async (): Promise<void> => {
		setIsPopoverOpen(false);
		await handleExportRawData({
			format: exportFormat,
			rowLimit,
			clearSelectColumns:
				dataSource !== DataSource.TRACES &&
				columnsScope === DownloadColumnsScopes.ALL,
			selectedColumns,
		});
	}, [
		exportFormat,
		rowLimit,
		columnsScope,
		selectedColumns,
		handleExportRawData,
		dataSource,
	]);

	const popoverContent = useMemo(
		() => (
			<div
				className="export-options-container"
				role="dialog"
				aria-label={t('export_options')}
				aria-modal="true"
			>
				<div className="export-format">
					<Typography.Text className="title">{t('format')}</Typography.Text>
					<RadioGroup value={exportFormat} onChange={setExportFormat}>
						<RadioGroupItem value={DownloadFormats.CSV}>csv</RadioGroupItem>
						<RadioGroupItem value={DownloadFormats.JSONL}>jsonl</RadioGroupItem>
					</RadioGroup>
				</div>

				<div className="horizontal-line" />

				<div className="row-limit">
					<Typography.Text className="title">{t('number_of_rows')}</Typography.Text>
					<RadioGroup
						value={String(rowLimit)}
						onChange={(value): void => setRowLimit(Number(value))}
					>
						<RadioGroupItem value={String(DownloadRowCounts.TEN_K)}>
							10k
						</RadioGroupItem>
						<RadioGroupItem value={String(DownloadRowCounts.THIRTY_K)}>
							30k
						</RadioGroupItem>
						<RadioGroupItem value={String(DownloadRowCounts.FIFTY_K)}>
							50k
						</RadioGroupItem>
					</RadioGroup>
				</div>

				{dataSource !== DataSource.TRACES && (
					<>
						<div className="horizontal-line" />

						<div className="columns-scope">
							<Typography.Text className="title">{t('columns')}</Typography.Text>
							<RadioGroup value={columnsScope} onChange={setColumnsScope}>
								<RadioGroupItem value={DownloadColumnsScopes.ALL}>
									{t('all')}
								</RadioGroupItem>
								<RadioGroupItem value={DownloadColumnsScopes.SELECTED}>
									{t('selected')}
								</RadioGroupItem>
							</RadioGroup>
						</div>
					</>
				)}

				<Button
					type="primary"
					icon={<Download size={16} />}
					onClick={handleExport}
					className="export-button"
					disabled={isDownloading}
					loading={isDownloading}
				>
					{t('export')}
				</Button>
			</div>
		),
		[
			exportFormat,
			rowLimit,
			columnsScope,
			isDownloading,
			handleExport,
			dataSource,
		],
	);

	return (
		<Popover
			content={popoverContent}
			trigger="click"
			placement="bottomRight"
			arrow={false}
			open={isPopoverOpen}
			onOpenChange={setIsPopoverOpen}
			rootClassName="download-popover"
		>
			<Tooltip title={t('download')} placement="top">
				<Button
					className="periscope-btn ghost"
					icon={
						isDownloading ? (
							<LoaderCircle size={14} className="animate-spin" />
						) : (
							<Download size={14} />
						)
					}
					data-testid={`periscope-btn-download-${dataSource}`}
					disabled={isDownloading}
				/>
			</Tooltip>
		</Popover>
	);
}
