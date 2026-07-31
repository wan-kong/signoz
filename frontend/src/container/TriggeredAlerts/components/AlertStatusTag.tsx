import { useTranslation } from 'react-i18next';
import { Badge } from '@signozhq/ui/badge';

interface AlertStatusTagProps {
	state: string;
	testId?: string;
}

function AlertStatusTag({ state, testId }: AlertStatusTagProps): JSX.Element {
	const { t } = useTranslation('alerts');

	switch (state) {
		case 'unprocessed':
			return (
				<Badge color="success" variant="outline" testId={testId}>
					{t('triggered_alerts.status.unprocessed')}
				</Badge>
			);
		case 'active':
			return (
				<Badge color="error" variant="outline" testId={testId}>
					{t('triggered_alerts.status.firing')}
				</Badge>
			);
		case 'suppressed':
			return (
				<Badge color="error" variant="outline" testId={testId}>
					{t('triggered_alerts.status.suppressed')}
				</Badge>
			);
		default:
			return (
				<Badge color="secondary" variant="outline" testId={testId}>
					{t('triggered_alerts.status.unknown')}
				</Badge>
			);
	}
}

export default AlertStatusTag;
