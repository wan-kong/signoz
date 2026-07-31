import {
	CloudDownload,
	FileCode,
	FileImage,
	FileSpreadsheet,
} from '@signozhq/icons';
import type { MenuItem } from '@signozhq/ui/dropdown-menu';
import {
	DownloadFormat,
	type PanelActionCapabilities,
} from 'pages/DashboardPageV2/DashboardContainer/Panels/types/panelDefinition';

const DOWNLOAD_FORMAT_OPTIONS: {
	format: DownloadFormat;
	labelKey: string;
	icon: JSX.Element;
}[] = [
	{
		format: DownloadFormat.CSV,
		labelKey: 'dashboard_page_v2.panel_actions.download_as_csv',
		icon: <FileSpreadsheet size={14} />,
	},
	{
		format: DownloadFormat.PNG,
		labelKey: 'dashboard_page_v2.panel_actions.download_as_png',
		icon: <FileImage size={14} />,
	},
	{
		format: DownloadFormat.SVG,
		labelKey: 'dashboard_page_v2.panel_actions.download_as_svg',
		icon: <FileCode size={14} />,
	},
];

type Translate = (key: string, options?: Record<string, unknown>) => string;

interface DownloadMenuItemArgs {
	supported?: PanelActionCapabilities['download'];
	onDownload: (format: DownloadFormat) => void;
	t: Translate;
}

/**
 * The "Download" submenu: one option per format the kind supports, each handing
 * the format to `onDownload`. Null when the kind supports no format.
 */
export function buildDownloadMenuItem({
	supported,
	onDownload,
	t,
}: DownloadMenuItemArgs): MenuItem | null {
	if (!supported) {
		return null;
	}

	const children: MenuItem[] = DOWNLOAD_FORMAT_OPTIONS.filter(
		({ format }) => supported[format],
	).map(({ format, labelKey, icon }) => ({
		key: `download-${format}`,
		label: t(labelKey),
		icon,
		onClick: (): void => onDownload(format),
	}));

	if (children.length === 0) {
		return null;
	}
	return {
		key: 'download',
		label: t('dashboard_page_v2.panel_actions.download'),
		icon: <CloudDownload size={14} />,
		children,
	};
}
