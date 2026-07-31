import { Button } from '@signozhq/ui/button';
import { Kbd } from '@signozhq/ui/kbd';
import { DEFAULT_PIN_TOOLTIP_KEY } from 'lib/uPlotV2/plugins/TooltipPlugin/types';
import { useTranslation } from 'react-i18next';

import Styles from './TooltipFooter.module.scss';
import { MousePointerClick, X } from '@signozhq/icons';
import logEvent from 'api/common/logEvent';
import { Events } from 'constants/events';

interface TooltipFooterProps {
	id: string;
	pinKey?: string;
	isPinned: boolean;
	canDrilldown?: boolean;
	dismiss: () => void;
}

export default function TooltipFooter({
	id,
	pinKey = DEFAULT_PIN_TOOLTIP_KEY,
	isPinned,
	canDrilldown = true,
	dismiss,
}: TooltipFooterProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const handleUnpinClick = (): void => {
		logEvent(Events.TOOLTIP_UNPINNED, {
			id: id,
		});
		dismiss();
	};
	return (
		<div
			className={Styles.footer}
			role="status"
			data-testid="uplot-tooltip-footer"
		>
			<div>
				{isPinned ? (
					<div className={Styles.hint}>
						<span>{t('dashboard_container.tooltip_footer.press')}</span>
						<Kbd active>{pinKey.toUpperCase()}</Kbd>
						<span>{t('dashboard_container.tooltip_footer.or')}</span>
						<Kbd active>Esc</Kbd>
						<span>{t('dashboard_container.tooltip_footer.to_unpin')}</span>
					</div>
				) : (
					<div className={Styles.hintList}>
						{canDrilldown && (
							<div className={Styles.hint} data-active="false">
								<Kbd>
									<MousePointerClick size={12} />
								</Kbd>
								<span>
									{t('dashboard_container.tooltip_footer.click_to_drilldown')}
								</span>
							</div>
						)}
						<div className={Styles.hint} data-active="false">
							<span>{t('dashboard_container.tooltip_footer.press')}</span>
							<Kbd>{pinKey.toUpperCase()}</Kbd>
							<span>{t('dashboard_container.tooltip_footer.to_pin_tooltip')}</span>
						</div>
					</div>
				)}
			</div>

			{isPinned && (
				<Button
					variant="outlined"
					color="secondary"
					size="sm"
					onClick={handleUnpinClick}
					aria-label={t('dashboard_container.tooltip_footer.unpin_tooltip')}
					data-testid="uplot-tooltip-unpin"
				>
					<X size={10} />
					<span>{t('dashboard_container.tooltip_footer.unpin')}</span>
				</Button>
			)}
		</div>
	);
}
