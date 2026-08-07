import { useTranslation } from 'react-i18next';
import { useIsMutating } from 'react-query';
import Spinner from 'components/Spinner';
import { REACT_QUERY_KEY } from 'constants/reactQueryKeys';
import { useFunnelContext } from 'pages/TracesFunnels/FunnelContext';

import EmptyFunnelResults from './EmptyFunnelResults';
import FunnelGraph from './FunnelGraph';
import OverallMetrics from './OverallMetrics';
import StepsTransitionResults from './StepsTransitionResults';

import './FunnelResults.styles.scss';

function FunnelResults(): JSX.Element {
	const { t } = useTranslation('funnel_results');
	const {
		validTracesCount,
		isValidateStepsLoading,
		hasIncompleteStepFields,
		hasAllEmptyStepFields,
		funnelId,
	} = useFunnelContext();

	const isFunnelUpdateMutating = useIsMutating([
		REACT_QUERY_KEY.UPDATE_FUNNEL_STEPS,
		funnelId,
	]);

	if (hasAllEmptyStepFields) {
		return <EmptyFunnelResults />;
	}

	if (hasIncompleteStepFields) {
		return (
			<EmptyFunnelResults
				title={t(
					'funnel_results.missing_fields_title',
					'Missing service / span names',
				)}
				description={t(
					'funnel_results.missing_fields_description',
					'Fill in the service and span names for all the steps',
				)}
			/>
		);
	}

	if (isValidateStepsLoading || isFunnelUpdateMutating) {
		return <Spinner size="large" />;
	}

	if (validTracesCount === 0) {
		return (
			<EmptyFunnelResults
				title={t(
					'funnel_results.no_traces_title',
					'There are no traces that match the funnel steps.',
				)}
				description={t(
					'funnel_results.no_traces_description',
					'Check the service / span names in the funnel steps and try again to start seeing analytics here',
				)}
			/>
		);
	}

	return (
		<div className="funnel-results">
			<OverallMetrics />
			<FunnelGraph />
			<StepsTransitionResults />
		</div>
	);
}

export default FunnelResults;
