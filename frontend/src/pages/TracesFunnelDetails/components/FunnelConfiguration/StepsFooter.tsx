import { useTranslation } from 'react-i18next';
import { useIsMutating } from 'react-query';
import { Button, Skeleton } from 'antd';
import { REACT_QUERY_KEY } from 'constants/reactQueryKeys';
import { Check, Cone } from '@signozhq/icons';
import { useFunnelContext } from 'pages/TracesFunnels/FunnelContext';

import './StepsFooter.styles.scss';

interface StepsFooterProps {
	stepsCount: number;
	isSaving: boolean;
}

function ValidTracesCount(): JSX.Element {
	const {
		hasAllEmptyStepFields,
		isValidateStepsLoading,
		hasIncompleteStepFields,
		validTracesCount,
		funnelId,
	} = useFunnelContext();
	const { t } = useTranslation('funnel_config');

	const isFunnelUpdateMutating = useIsMutating([
		REACT_QUERY_KEY.UPDATE_FUNNEL_STEPS,
		funnelId,
	]);

	if (hasAllEmptyStepFields) {
		return (
			<span className="steps-footer__valid-traces">
				{t('steps_footer.no_service_span_names', 'No service / span names')}
			</span>
		);
	}

	if (hasIncompleteStepFields) {
		return (
			<span className="steps-footer__valid-traces">
				{t(
					'steps_footer.missing_service_span_names',
					'Missing service / span names',
				)}
			</span>
		);
	}

	if (isValidateStepsLoading || isFunnelUpdateMutating) {
		return <Skeleton.Button size="small" />;
	}

	if (validTracesCount === 0) {
		return (
			<span className="steps-footer__valid-traces steps-footer__valid-traces--none">
				{t('steps_footer.no_valid_traces', 'No valid traces found')}
			</span>
		);
	}

	return (
		<span className="steps-footer__valid-traces">
			{t('steps_footer.valid_traces', 'Valid traces found')}
		</span>
	);
}

function StepsFooter({ stepsCount, isSaving }: StepsFooterProps): JSX.Element {
	const { hasIncompleteStepFields, handleSaveFunnel, hasUnsavedChanges } =
		useFunnelContext();
	const { t } = useTranslation('funnel_config');

	return (
		<div className="steps-footer">
			<div className="steps-footer__left">
				<Cone className="funnel-icon" size={14} />
				<span>
					{t('steps_footer.steps_count', '{{stepsCount}} steps', { stepsCount })}
				</span>
				<span>·</span>
				<ValidTracesCount />
			</div>
			<div className="steps-footer__right">
				<Button
					disabled={hasIncompleteStepFields || !hasUnsavedChanges}
					onClick={handleSaveFunnel}
					type="primary"
					className="steps-footer__button steps-footer__button--run"
					icon={<Check size={14} />}
					loading={isSaving}
				>
					{t('steps_footer.save_funnel', 'Save funnel')}
				</Button>
			</div>
		</div>
	);
}

export default StepsFooter;
