import { Info } from '@signozhq/icons';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { useTranslation } from 'react-i18next';

import {
	translateInfraKey,
	translateInfraNode,
	translateInfraText,
} from '../../InfraMonitoringK8s/i18n';
import styles from './ColumnHeader.module.scss';
import cx from 'classnames';

const DOCS_BASE_URL = `${process.env.DOCS_BASE_URL}/docs`;

interface ColumnHeaderProps {
	children?: React.ReactNode;
	title?: string;
	titleKey?: string;
	docPath?: string;
	tooltip?: string;
	tooltipKey?: string;
	className?: string;
}

function ColumnHeader({
	children,
	title,
	titleKey,
	docPath,
	tooltip,
	tooltipKey,
	className,
}: ColumnHeaderProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	const renderContent = (): React.ReactNode => {
		if (children) {
			return translateInfraNode(t, children);
		}

		if (title) {
			const titleText = titleKey
				? translateInfraKey(t, titleKey, title)
				: translateInfraText(t, title);
			const parts = titleText.split('\n');
			return parts.map((part, index) => (
				<div key={`${title}-${part}`}>
					{part}
					{index < parts.length - 1 && <br />}
				</div>
			));
		}

		return null;
	};

	const renderInfoIcon = (): React.ReactNode => {
		if (docPath) {
			const tooltipTitle = translateInfraKey(
				t,
				tooltipKey,
				tooltip || 'Not sure what this means?',
			);
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
								{translateInfraKey(t, 'display.learn_more_period', 'Learn more.')}
							</a>
						</>
					}
				>
					<div className={styles.infoIcon}>
						<Info size="md" />
					</div>
				</TooltipSimple>
			);
		}

		if (tooltip) {
			return (
				<TooltipSimple title={translateInfraText(t, tooltip)}>
					<div className={styles.infoIcon}>
						<Info size="md" />
					</div>
				</TooltipSimple>
			);
		}

		return null;
	};

	return (
		<div className={cx(styles.columnHeader, className)} data-slot="column-header">
			<div className={styles.columnHeaderLabel}>{renderContent()}</div>
			{renderInfoIcon()}
		</div>
	);
}

export default ColumnHeader;
