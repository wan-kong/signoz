import { useTranslation } from 'react-i18next';
import { Info } from '@signozhq/icons';
import { Typography } from '@signozhq/ui/typography';
import { Skeleton, Tooltip } from 'antd';
import cx from 'classnames';

import { formatCompact, formatUsd } from '../../../configUtils';
import styles from './VolumeControlStats.module.scss';

interface VolumeControlStatsProps {
	activeRules: number;
	ingestedSeries: number;
	retainedSeries: number;
	ingestedSamples: number;
	retainedSamples: number;
	estimatedMonthlySavingsUsd: number;
	isLoading?: boolean;
	isError?: boolean;
}

interface StatItem {
	label: string;
	value: string;
	tooltip: string;
	delta?: string;
	unit?: string;
	highlighted?: boolean;
	valueGood?: boolean;
}

function VolumeControlStats({
	activeRules,
	ingestedSeries,
	retainedSeries,
	ingestedSamples,
	retainedSamples,
	estimatedMonthlySavingsUsd,
	isLoading = false,
	isError = false,
}: VolumeControlStatsProps): JSX.Element {
	const { t } = useTranslation('common');
	const overallReduction =
		ingestedSeries > 0
			? Math.round((1 - retainedSeries / ingestedSeries) * 100)
			: 0;

	const sampleReduction =
		ingestedSamples > 0
			? Math.round((1 - retainedSamples / ingestedSamples) * 100)
			: 0;

	const items: StatItem[] = [
		{
			label: t('volume_control.configured_rules', 'Configured rules'),
			value: String(activeRules),
			tooltip: t(
				'volume_control.configured_rules_tooltip',
				'Volume-control rules currently configured for this workspace.',
			),
		},
		{
			label: t('volume_control.ingested_series', 'Ingested series'),
			value: formatCompact(ingestedSeries),
			tooltip: t(
				'volume_control.ingested_series_tooltip',
				'Distinct time series across all metrics in the last 1 hour, before any reduction.',
			),
		},
		{
			label: t('volume_control.retained_series', 'Retained series'),
			value: formatCompact(retainedSeries),
			delta: overallReduction > 0 ? `−${overallReduction}%` : undefined,
			tooltip: t(
				'volume_control.retained_series_tooltip',
				'Distinct time series kept across all metrics in the last 1 hour; everything except what the rules reduce away. Lower than ingested means more reduction.',
			),
		},
		{
			label: t('volume_control.ingested_samples', 'Ingested samples'),
			value: formatCompact(ingestedSamples),
			tooltip: t(
				'volume_control.ingested_samples_tooltip',
				'Sample data points across all metrics in the last 1 hour, before any reduction.',
			),
		},
		{
			label: t('volume_control.retained_samples', 'Retained samples'),
			value: formatCompact(retainedSamples),
			delta: sampleReduction > 0 ? `−${sampleReduction}%` : undefined,
			tooltip: t(
				'volume_control.retained_samples_tooltip',
				'Sample data points kept across all metrics in the last 1 hour; everything except what the rules reduce. Samples reduce more than series because series do not all carry the same sample volume.',
			),
		},
		{
			label: t('volume_control.est_monthly_savings', 'Est. monthly savings'),
			value: formatUsd(estimatedMonthlySavingsUsd),
			unit: '/mo',
			highlighted: true,
			valueGood: true,
			tooltip: t(
				'volume_control.est_monthly_savings_tooltip',
				'Rough monthly estimate: the samples the rules reduced in the last 1 hour, scaled to a month at 1-month standard retention. It is extrapolated from a single rolling hour.',
			),
		},
	];

	return (
		<div className={styles.statsSection}>
			<Typography.Text size="small" color="muted">
				{t('time.last_1_hour', 'Last 1 hour')}
			</Typography.Text>
			<div className={styles.stats} data-testid="volume-control-stats">
				{items.map((item) => (
					<div
						key={item.label}
						className={cx(styles.statCard, {
							[styles.statCardHighlighted]: item.highlighted,
						})}
					>
						<div className={styles.statCardLabelRow}>
							<Typography.Text
								size="sm"
								color="muted"
								className={styles.statCardLabel}
							>
								{item.label}
							</Typography.Text>
							<Tooltip title={item.tooltip}>
								<Info size={12} className={styles.statCardInfo} />
							</Tooltip>
						</div>
						{isLoading && (
							<Skeleton.Button active size="small" className={styles.statCardValue} />
						)}
						{!isLoading && isError && (
							<Typography.Text
								as="div"
								size="small"
								color="danger"
								className={styles.statCardValue}
							>
								{t('volume_control.failed_to_load', 'Failed to load')}
							</Typography.Text>
						)}
						{!isLoading && !isError && (
							<Typography.Text
								as="div"
								size="large"
								weight="semibold"
								color={item.valueGood ? 'success' : undefined}
								className={styles.statCardValue}
							>
								{item.value}
								{item.delta && (
									<Typography.Text size="small" weight="semibold" color="success">
										{item.delta}
									</Typography.Text>
								)}
								{item.unit && (
									<Typography.Text size="small" weight="medium" color="muted">
										{item.unit}
									</Typography.Text>
								)}
							</Typography.Text>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default VolumeControlStats;
