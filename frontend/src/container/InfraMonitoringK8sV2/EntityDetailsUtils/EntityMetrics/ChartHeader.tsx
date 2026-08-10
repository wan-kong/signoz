import { Link } from 'react-router-dom';
import { Compass, Info } from '@signozhq/icons';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { useTranslation } from 'react-i18next';

import {
	translateInfraKey,
	translateInfraText,
} from 'container/MetricsExplorer/Summary/i18n';
import styles from './ChartHeader.module.scss';

const DOCS_BASE_URL = `${process.env.DOCS_BASE_URL}/docs`;

interface ChartHeaderProps {
	title: string;
	docPath?: string;
	tooltip?: string;
	metricsExplorerUrl?: string;
	metricsExplorerTestId?: string;
	onExploreClick?: () => void;
}

function ChartHeader({
	title,
	docPath,
	tooltip,
	metricsExplorerUrl,
	metricsExplorerTestId = 'open-metrics-explorer',
	onExploreClick,
}: ChartHeaderProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	const renderInfoIcon = (): React.ReactNode => {
		if (docPath) {
			const tooltipTitle = translateInfraKey(
				t,
				undefined,
				tooltip || 'Not sure what this represents?',
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
					<span className={styles.infoIcon} data-testid="chart-header-info-icon">
						<Info size="md" />
					</span>
				</TooltipSimple>
			);
		}

		if (tooltip) {
			return (
				<TooltipSimple title={translateInfraText(t, tooltip)} arrow>
					<span className={styles.infoIcon} data-testid="chart-header-info-icon">
						<Info size="md" />
					</span>
				</TooltipSimple>
			);
		}

		return null;
	};

	return (
		<div className={styles.chartHeader} data-testid="chart-header">
			<span className={styles.chartHeaderLabel}>
				{translateInfraText(t, title)}
			</span>
			{renderInfoIcon()}
			{metricsExplorerUrl && (
				<TooltipSimple
					title={t('display.open_in_metrics_explorer', 'Open in Metrics Explorer')}
					arrow
				>
					<Link
						to={metricsExplorerUrl}
						className={styles.metricsExplorerLink}
						data-testid={metricsExplorerTestId}
						onClick={onExploreClick}
					>
						<Compass size={14} />
					</Link>
				</TooltipSimple>
			)}
		</div>
	);
}

export default ChartHeader;
