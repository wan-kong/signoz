import { Group, Info } from '@signozhq/icons';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { useTranslation } from 'react-i18next';

import styles from './EntityGroupHeader.module.scss';

const DOCS_BASE_URL = `${process.env.DOCS_BASE_URL}/docs`;

interface EntityGroupHeaderProps {
	title: string;
	titleKey?: string;
	icon?: React.ReactNode;
	docPath?: string;
	tooltip?: string;
	tooltipKey?: string;
}

function EntityGroupHeader({
	title,
	titleKey,
	icon,
	docPath,
	tooltip,
	tooltipKey,
}: EntityGroupHeaderProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	const renderInfoIcon = (): React.ReactNode => {
		if (docPath) {
			const tooltipTitle = t(tooltipKey || '', {
				defaultValue: tooltip || 'Not sure what this means?',
			});
			return (
				<TooltipSimple
					arrow
					title={
						<>
							{tooltipTitle}{' '}
							<a
								href={`${DOCS_BASE_URL}${docPath}`}
								target="_blank"
								rel="noopener"
								onClick={(e): void => e.stopPropagation()}
							>
								{t('display.learn_more_period', { defaultValue: 'Learn more.' })}
							</a>
						</>
					}
				>
					<span className={styles.infoIcon}>
						<Info size="md" />
					</span>
				</TooltipSimple>
			);
		}

		if (tooltip) {
			return (
				<TooltipSimple title={t(tooltipKey || '', { defaultValue: tooltip })}>
					<span className={styles.infoIcon}>
						<Info size="md" />
					</span>
				</TooltipSimple>
			);
		}

		return null;
	};

	return (
		<div className={styles.entityGroupHeader} data-slot="entity-group-header">
			<span data-slot="icon">
				{icon || <Group size={14} data-hide-expanded="true" />}
			</span>{' '}
			{t(titleKey || title || '', { defaultValue: title })}
			{renderInfoIcon()}
		</div>
	);
}

export default EntityGroupHeader;
