import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFunnelMetrics } from 'hooks/TracesFunnels/useFunnelMetrics';

import FunnelMetricsTable from './FunnelMetricsTable';

function OverallMetrics(): JSX.Element {
	const { t } = useTranslation('funnel_results');
	const { funnelId } = useParams<{ funnelId: string }>();
	const { isLoading, metricsData, conversionRate, isError } = useFunnelMetrics({
		funnelId,
	});

	return (
		<FunnelMetricsTable
			title={t('overall_metrics.title', 'Overall Funnel Metrics')}
			subtitle={{
				label: t('overall_metrics.conversion_rate', 'Conversion rate'),
				value: `${conversionRate.toFixed(2)}%`,
			}}
			isLoading={isLoading}
			isError={isError}
			data={metricsData}
		/>
	);
}

export default OverallMetrics;
