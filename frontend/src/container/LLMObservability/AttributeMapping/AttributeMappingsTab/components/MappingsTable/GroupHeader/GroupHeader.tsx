import { Info } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { Typography } from '@signozhq/ui/typography';

import { DraftGroup } from 'container/LLMObservability/AttributeMapping/types';

import ConditionsTooltip from './ConditionsTooltip';
import styles from './GroupHeader.module.scss';

interface GroupHeaderProps {
	group: DraftGroup;
}

function GroupHeader({ group }: GroupHeaderProps): JSX.Element {
	const { t } = useTranslation('common');
	const conditionCount = group.attributes.length + group.resource.length;

	return (
		<div
			className={styles.groupHeaderLabel}
			data-testid={`group-expand-${group.localId}`}
		>
			<Typography.Text
				as="span"
				className={styles.groupName}
				testId={`group-name-${group.localId}`}
			>
				{group.name}
			</Typography.Text>
			<TooltipSimple
				title={
					<ConditionsTooltip
						attributes={group.attributes}
						resource={group.resource}
					/>
				}
				side="bottom"
				align="start"
			>
				<span
					className={styles.conditionCount}
					data-testid={`group-condition-count-${group.localId}`}
				>
					· {conditionCount}{' '}
					{conditionCount === 1
						? t('llm_observability.condition', 'condition')
						: t('llm_observability.conditions', 'conditions')}
					<Info size={12} className={styles.conditionInfoIcon} />
				</span>
			</TooltipSimple>
		</div>
	);
}

export default GroupHeader;
