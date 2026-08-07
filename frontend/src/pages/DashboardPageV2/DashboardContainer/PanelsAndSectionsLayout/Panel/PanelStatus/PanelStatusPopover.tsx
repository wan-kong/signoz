import { Color } from '@signozhq/design-tokens';
import { useTranslation } from 'react-i18next';
import { CircleX, TriangleAlert } from '@signozhq/icons';
import { TooltipSimple } from '@signozhq/ui/tooltip';

import PanelStatusContent from './PanelStatusContent';
import type { PanelStatusDetail, PanelStatusVariant } from './types';
import styles from './PanelStatusPopover.module.scss';

const VARIANT_CONFIG: Record<
	PanelStatusVariant,
	{ color: string; ariaLabelKey: string }
> = {
	error: { color: Color.BG_CHERRY_500, ariaLabelKey: 'panel_status.error_aria' },
	warning: {
		color: Color.BG_AMBER_500,
		ariaLabelKey: 'panel_status.warning_aria',
	},
};

interface PanelStatusPopoverProps {
	variant: PanelStatusVariant;
	detail: PanelStatusDetail;
	/** Overrides the trigger's test id; defaults to `panel-status-<variant>`. */
	testId?: string;
}

/**
 * Header status indicator: an icon that opens a tooltip with the status detail.
 * One component drives both variants so error and warning stay in lockstep.
 */
function PanelStatusPopover({
	variant,
	detail,
	testId,
}: PanelStatusPopoverProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const { color, ariaLabelKey } = VARIANT_CONFIG[variant];
	const ariaLabel = t(ariaLabelKey);
	const Icon = variant === 'error' ? CircleX : TriangleAlert;

	return (
		<TooltipSimple
			title={<PanelStatusContent variant={variant} detail={detail} />}
			side="top"
			align="end"
			arrow
			tooltipContentProps={{ className: styles.tooltipContent }}
		>
			<span
				className={styles.trigger}
				aria-label={ariaLabel}
				data-testid={testId ?? `panel-status-${variant}`}
			>
				<Icon size={16} color={color} />
			</span>
		</TooltipSimple>
	);
}

export default PanelStatusPopover;
