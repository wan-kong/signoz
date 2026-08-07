import { useTranslation } from 'react-i18next';
import { Gauge } from '@signozhq/icons';
import { Tooltip } from 'antd';
import { MetricreductionruletypesGettableReductionRuleDTO } from 'api/generated/services/sigNoz.schemas';

import { Badge } from '@signozhq/ui/badge';

interface VolumeControlBadgeProps {
	rule: MetricreductionruletypesGettableReductionRuleDTO;
}

function VolumeControlBadge({ rule }: VolumeControlBadgeProps): JSX.Element {
	const { t } = useTranslation('common');
	const badge = (
		<Badge
			data-testid="vc-badge-active"
			variant="outline"
			color={rule.active ? 'success' : 'warning'}
		>
			<Gauge size={12} />
			{rule.active
				? t('volume_control.active', 'Active')
				: t('volume_control.pending', 'Pending')}
		</Badge>
	);

	if (rule.active) {
		return badge;
	}

	return (
		<Tooltip
			title={t(
				'volume_control.badge_effect_tooltip',
				'Takes about 5 minutes to take effect',
			)}
		>
			<span>{badge}</span>
		</Tooltip>
	);
}

export default VolumeControlBadge;
