import { useFunnelErrorTraces } from 'hooks/TracesFunnels/useFunnels';
import { useTranslation } from 'react-i18next';
import { FunnelStepData } from 'types/api/traceFunnels';

import FunnelTopTracesTable from './FunnelTopTracesTable';

interface TopTracesWithErrorsProps {
	funnelId: string;
	stepAOrder: number;
	stepBOrder: number;
	steps: FunnelStepData[];
}

function TopTracesWithErrors(props: TopTracesWithErrorsProps): JSX.Element {
	const { t } = useTranslation('trace');
	return (
		<FunnelTopTracesTable
			{...props}
			title={t('funnels.traces_with_errors')}
			tooltip={t('funnels.errors_tooltip')}
			useQueryHook={useFunnelErrorTraces}
		/>
	);
}

export default TopTracesWithErrors;
