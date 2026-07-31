import { Color } from '@signozhq/design-tokens';
import { useTranslation } from 'react-i18next';
import { useIsDarkMode } from 'hooks/useDarkMode';
import { BellOff, CircleCheck, CircleOff, Flame } from '@signozhq/icons';
import { RuletypesAlertStateDTO } from 'api/generated/services/sigNoz.schemas';

import './AlertState.styles.scss';

type AlertStateProps = {
	state: RuletypesAlertStateDTO | string;
	showLabel?: boolean;
};

export default function AlertState({
	state,
	showLabel,
}: AlertStateProps): JSX.Element {
	const { t } = useTranslation('alerts');
	let icon;
	let label;
	const isDarkMode = useIsDarkMode();
	switch (state) {
		case RuletypesAlertStateDTO.nodata:
			icon = (
				<CircleOff
					size={18}
					fill={Color.BG_SIENNA_400}
					color={Color.BG_SIENNA_400}
				/>
			);
			label = (
				<span style={{ color: Color.BG_SIENNA_400 }}>
					{t('alert_details.state.no_data')}
				</span>
			);
			break;

		case RuletypesAlertStateDTO.disabled:
			icon = (
				<BellOff
					size={18}
					fill={Color.BG_VANILLA_400}
					color={Color.BG_VANILLA_400}
				/>
			);
			label = (
				<span style={{ color: Color.BG_VANILLA_400 }}>
					{t('alert_details.state.muted')}
				</span>
			);
			break;

		case RuletypesAlertStateDTO.firing:
			icon = (
				<Flame size={18} fill={Color.BG_CHERRY_500} color={Color.BG_CHERRY_500} />
			);
			label = (
				<span style={{ color: Color.BG_CHERRY_500 }}>
					{t('alert_details.state.firing')}
				</span>
			);
			break;

		case RuletypesAlertStateDTO.inactive:
		case 'normal': // legacy
			icon = (
				<CircleCheck
					size={18}
					fill={Color.BG_FOREST_500}
					color={isDarkMode ? Color.BG_INK_400 : Color.BG_VANILLA_100}
				/>
			);
			label = (
				<span style={{ color: Color.BG_FOREST_500 }}>
					{t('alert_details.state.resolved')}
				</span>
			);
			break;

		default:
			icon = null;
	}

	return (
		<div className="alert-state">
			{icon} {showLabel && <div className="alert-state__label">{label}</div>}
		</div>
	);
}

AlertState.defaultProps = {
	showLabel: false,
};
