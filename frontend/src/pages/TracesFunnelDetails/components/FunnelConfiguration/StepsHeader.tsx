import { useTranslation } from 'react-i18next';
import DateTimeSelectionV2 from 'container/TopNav/DateTimeSelectionV2';

import './StepsHeader.styles.scss';

function StepsHeader(): JSX.Element {
	const { t } = useTranslation('funnel_config');
	return (
		<div className="steps-header">
			<div className="steps-header__label">
				{t('steps_header.funnel_steps', 'FUNNEL STEPS')}
			</div>
			<div className="steps-header__time-range">
				<DateTimeSelectionV2
					showAutoRefresh={false}
					showRefreshText={false}
					hideShareModal
					showRecentlyUsed={false}
				/>
			</div>
		</div>
	);
}

export default StepsHeader;
