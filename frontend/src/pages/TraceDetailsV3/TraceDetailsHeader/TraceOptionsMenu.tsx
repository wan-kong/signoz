import { Button } from '@signozhq/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@signozhq/ui/dropdown-menu';
import { Settings2 } from '@signozhq/icons';
import { ExportFormat } from 'lib/exportData/types';
import { useTranslation } from 'react-i18next';

import { useTraceStore } from '../stores/traceStore';
import { useDownloadTrace } from './useDownloadTrace';

import styles from './TraceOptionsMenu.module.scss';

interface TraceOptionsMenuProps {
	showTraceDetails: boolean;
	onToggleTraceDetails: () => void;
	onOpenPreviewFields: () => void;
	traceId: string;
	startTime: number;
	endTime: number;
	totalSpansCount: number;
}

// Composed from dropdown-menu primitives (instead of DropdownMenuSimple)
// because the simple preset offers no way to style the submenu content,
// which renders in its own portal and needs a z-index above FloatingPanel.
function TraceOptionsMenu({
	showTraceDetails,
	onToggleTraceDetails,
	onOpenPreviewFields,
	traceId,
	startTime,
	endTime,
	totalSpansCount,
}: TraceOptionsMenuProps): JSX.Element {
	const { t } = useTranslation('trace');
	const colorByField = useTraceStore((s) => s.colorByField);
	const setColorByField = useTraceStore((s) => s.setColorByField);
	const availableColorByOptions = useTraceStore(
		(s) => s.availableColorByOptions,
	);

	const { isDownloading, isExportDisabled, downloadTrace } = useDownloadTrace({
		traceId,
		startTime,
		endTime,
		totalSpansCount,
	});

	const handleColorByChange = (name: string): void => {
		const next = availableColorByOptions.find((o) => o.field.name === name);
		if (next) {
			setColorByField(next.field);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					color="secondary"
					aria-label={t('trace_details.options')}
					prefix={<Settings2 size={14} />}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className={styles.traceOptionsDropdown}>
				<DropdownMenuItem clickable onSelect={onToggleTraceDetails}>
					{showTraceDetails
						? t('trace_details.hide_details')
						: t('trace_details.show_details')}
				</DropdownMenuItem>
				<DropdownMenuItem clickable onSelect={onOpenPreviewFields}>
					{t('trace_details.preview_fields')}
				</DropdownMenuItem>
				{/* Only show the "Colour by" submenu if there's an actual choice to make. */}
				{availableColorByOptions.length > 1 && (
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							{t('trace_details.colour_by')}
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className={styles.traceOptionsDropdown}>
							<DropdownMenuLabel>
								{t('trace_details.colour_by_label')}
							</DropdownMenuLabel>
							<DropdownMenuRadioGroup
								value={colorByField.name}
								onValueChange={handleColorByChange}
							>
								{availableColorByOptions.map((opt) => (
									<DropdownMenuRadioItem key={opt.field.name} value={opt.field.name}>
										{opt.label}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				)}
				{!isExportDisabled && (
					<DropdownMenuSub>
						<DropdownMenuSubTrigger
							disabled={isDownloading}
							data-testid="download-trace-submenu"
						>
							{t('trace_details.download_trace')}
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className={styles.traceOptionsDropdown}>
							<DropdownMenuItem
								clickable
								onSelect={(): void => downloadTrace(ExportFormat.Csv)}
								testId="download-trace-csv"
							>
								CSV
							</DropdownMenuItem>
							<DropdownMenuItem
								clickable
								onSelect={(): void => downloadTrace(ExportFormat.Jsonl)}
								testId="download-trace-jsonl"
							>
								JSONL
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default TraceOptionsMenu;
