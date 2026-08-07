import { useTranslation } from 'react-i18next';
import { ILog } from 'types/api/logs/log';
import { PipelineData } from 'types/api/pipeline/def';

import LogsList from '../../../components/LogsList';
import usePipelinePreview from '../../../hooks/usePipelinePreview';

import './styles.scss';

function PipelineSimulationResult({
	inputLogs,
	pipeline,
}: PipelineSimulationResultProps): JSX.Element {
	const { t } = useTranslation('pipeline');
	const { isLoading, outputLogs, isError, errorMsg } = usePipelinePreview({
		pipeline: {
			...pipeline,
			// Ensure disabled pipelines can also be previewed
			enabled: true,
		},
		inputLogs,
	});

	if (isError) {
		return (
			<div className="pipeline-simulation-error">
				<div>{t('preview.error')}</div>
				<div>{errorMsg}</div>
			</div>
		);
	}

	if (isLoading) {
		return <div>{t('preview.loading')}</div>;
	}

	if (outputLogs.length < 1) {
		return <div>{t('preview.no_logs')}</div>;
	}

	return <LogsList logs={outputLogs} />;
}

export interface PipelineSimulationResultProps {
	inputLogs: ILog[];
	pipeline: PipelineData;
}

export default PipelineSimulationResult;
