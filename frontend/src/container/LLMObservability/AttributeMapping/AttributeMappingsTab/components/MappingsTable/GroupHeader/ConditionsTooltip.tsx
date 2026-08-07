import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';

import styles from './ConditionsTooltip.module.scss';

interface ConditionsTooltipProps {
	attributes: string[];
	resource: string[];
}

function ConditionsTooltip({
	attributes,
	resource,
}: ConditionsTooltipProps): JSX.Element {
	const { t } = useTranslation('common');
	const hasConditions = attributes.length > 0 || resource.length > 0;

	if (!hasConditions) {
		return (
			<Typography.Text as="span" size="small" color="muted">
				{t('llm_observability.no_conditions')}
			</Typography.Text>
		);
	}

	return (
		<div
			className={styles.conditionsTooltip}
			data-testid="group-conditions-tooltip"
		>
			{attributes.length > 0 && (
				<div className={styles.section}>
					<Typography.Text as="span" size="small" color="muted">
						{t('llm_observability.runs_when_span_attribute')}
					</Typography.Text>
					<div className={styles.keyList}>
						{attributes.map((key) => (
							<code key={key} className={styles.key}>
								{key}
							</code>
						))}
					</div>
				</div>
			)}
			{resource.length > 0 && (
				<div className={styles.section}>
					<Typography.Text as="span" size="sm" color="muted">
						{attributes.length > 0
							? t('llm_observability.or_when')
							: t('llm_observability.runs_when')}{' '}
						{t('llm_observability.resource_key_contains')}
					</Typography.Text>
					<div className={styles.keyList}>
						{resource.map((key) => (
							<code key={key} className={styles.key}>
								{key}
							</code>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default ConditionsTooltip;
