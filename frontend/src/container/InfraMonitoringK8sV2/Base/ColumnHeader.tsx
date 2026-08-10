import { Info } from '@signozhq/icons';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { useTranslation } from 'react-i18next';

import {
	translateInfraKey,
	translateInfraNode,
	translateInfraText,
} from 'container/MetricsExplorer/Summary/i18n';
import styles from './ColumnHeader.module.scss';
import cx from 'classnames';
import { MouseEventHandler } from 'react';

const DOCS_BASE_URL = `${process.env.DOCS_BASE_URL}/docs`;

interface ColumnHeaderProps {
	children?: React.ReactNode;
	title?: string;
	titleKey?: string;
	docPath?: string;
	tooltip?: React.ReactNode;
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
	const stopPropagationHandler: MouseEventHandler = (e): void =>
		e.stopPropagation();

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
			const tooltipTitle =
				typeof tooltip === 'string'
					? tooltipKey
						? translateInfraKey(t, tooltipKey, tooltip)
						: translateInfraText(t, tooltip)
					: tooltip || translateInfraText(t, 'Not sure what this means?');
			const isJustStringTitle = typeof tooltipTitle === 'string';

			return (
				<TooltipSimple
					arrow
					title={
						<div onClick={stopPropagationHandler}>
							{tooltipTitle}{' '}
							<a
								href={`${DOCS_BASE_URL}${docPath}`}
								target="_blank"
								rel="noopener"
								onClick={stopPropagationHandler}
							>
								{isJustStringTitle
									? translateInfraKey(t, 'display.learn_more_period', 'Learn more.')
									: translateInfraKey(
											t,
											'display.check_the_documentation_to_learn_more',
											'Check the documentation to learn more.',
										)}
							</a>
						</div>
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
				<TooltipSimple
					title={
						<div onClick={stopPropagationHandler}>
							{typeof tooltip === 'string' ? translateInfraText(t, tooltip) : tooltip}
						</div>
					}
				>
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
