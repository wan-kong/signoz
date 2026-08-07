import i18n from 'ReactI18';
import { Spin } from 'antd';
import {
	CircleMinus,
	Loader,
	SolidCheckCircle2,
	SolidAlertOctagon,
	SolidXCircle,
} from '@signozhq/icons';

export function getDeploymentStage(value: string): string {
	switch (value) {
		case 'in_progress':
			return i18n.t('change_history.in_progress', 'In Progress', {
				ns: 'pipeline',
			});
		case 'deployed':
			return i18n.t('change_history.deployed', 'Deployed', { ns: 'pipeline' });
		case 'dirty':
			return i18n.t('change_history.dirty', 'Dirty', { ns: 'pipeline' });
		case 'failed':
			return i18n.t('change_history.failed', 'Failed', { ns: 'pipeline' });
		case 'unknown':
			return i18n.t('change_history.unknown', 'Unknown', { ns: 'pipeline' });
		default:
			return '';
	}
}

export function getDeploymentStageIcon(value: string): JSX.Element {
	switch (value) {
		case 'in_progress':
			return (
				<Spin
					data-testid="deployment-icon-in-progress"
					indicator={<Loader style={{ fontSize: 15 }} className="animate-spin" />}
				/>
			);
		case 'deployed':
			return (
				<SolidCheckCircle2 size="md" data-testid="deployment-icon-deployed" />
			);
		case 'dirty':
			return <SolidAlertOctagon size="md" data-testid="deployment-icon-dirty" />;
		case 'failed':
			return <SolidXCircle size="md" data-testid="deployment-icon-failed" />;
		case 'unknown':
			return <CircleMinus size="md" data-testid="deployment-icon-unknown" />;
		default:
			return <span />;
	}
}
