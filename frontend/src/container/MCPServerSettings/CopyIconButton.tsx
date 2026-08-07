import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { TooltipSimple, TooltipProvider } from '@signozhq/ui/tooltip';
import { Copy } from '@signozhq/icons';
import './CopyIconButton.styles.scss';

interface CopyIconButtonProps {
	ariaLabel: string;
	onCopy: () => void;
	disabled?: boolean;
}

function CopyIconButton({
	ariaLabel,
	onCopy,
	disabled = false,
}: CopyIconButtonProps): JSX.Element {
	const { t } = useTranslation('mcp_server');

	const tooltipTitle = disabled
		? t('copy_icon.enter_region_first', 'Enter your Cloud region first')
		: t('copy_icon.copy_to_clipboard', 'Copy to clipboard');

	return (
		<TooltipProvider>
			<TooltipSimple title={tooltipTitle}>
				<span>
					<Button
						color="secondary"
						variant="ghost"
						size="icon"
						aria-label={ariaLabel}
						disabled={disabled}
						className="mcp-copy-btn"
						prefix={<Copy size={14} />}
						onClick={onCopy}
					/>
				</span>
			</TooltipSimple>
		</TooltipProvider>
	);
}

export default CopyIconButton;
