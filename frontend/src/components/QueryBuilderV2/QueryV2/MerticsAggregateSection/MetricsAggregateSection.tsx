import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Tooltip } from 'antd';
import cx from 'classnames';
import InputWithLabel from 'components/InputWithLabel/InputWithLabel';
import { ATTRIBUTE_TYPES, PANEL_TYPES } from 'constants/queryBuilder';
import SpaceAggregationOptions from 'container/QueryBuilder/components/SpaceAggregationOptions/SpaceAggregationOptions';
import { GroupByFilter, OperatorsSelect } from 'container/QueryBuilder/filters';
import { useQueryOperations } from 'hooks/queryBuilder/useQueryBuilderOperations';
import { IBuilderQuery } from 'types/api/queryBuilder/queryBuilderData';
import { MetricAggregation } from 'types/api/v5/queryRange';

import { useQueryBuilderV2Context } from '../../QueryBuilderV2Context';

import './MetricsAggregateSection.styles.scss';

const MetricsAggregateSection = memo(function MetricsAggregateSection({
	query,
	index,
	version,
	panelType,
	signalSource = '',
}: {
	query: IBuilderQuery;
	index: number;
	version: string;
	panelType: PANEL_TYPES | null;
	signalSource: string;
}): JSX.Element {
	const { t } = useTranslation('common');
	const { setAggregationOptions } = useQueryBuilderV2Context();
	const {
		operators,
		spaceAggregationOptions,
		handleChangeQueryData,
		handleChangeOperator,
		handleSpaceAggregationChange,
	} = useQueryOperations({
		index,
		query,
		entityVersion: version,
	});

	const queryAggregation = useMemo(
		() => query.aggregations?.[0] as MetricAggregation,
		[query.aggregations],
	);

	const isHistogram = useMemo(
		() => query.aggregateAttribute?.type === ATTRIBUTE_TYPES.HISTOGRAM,
		[query.aggregateAttribute?.type],
	);

	useEffect(() => {
		setAggregationOptions(query.queryName, [
			{
				func: queryAggregation.spaceAggregation || 'count',
				arg: queryAggregation.metricName || '',
			},
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		queryAggregation.spaceAggregation,
		queryAggregation.metricName,
		query.queryName,
	]);

	const handleChangeGroupByKeys = useCallback(
		(value: IBuilderQuery['groupBy']) => {
			handleChangeQueryData('groupBy', value);
		},
		[handleChangeQueryData],
	);

	const handleChangeAggregateEvery = useCallback(
		(value: string) => {
			handleChangeQueryData('stepInterval', Number(value));
		},
		[handleChangeQueryData],
	);

	const showAggregationInterval = useMemo(
		() => panelType !== PANEL_TYPES.VALUE,
		[panelType],
	);

	const disableOperatorSelector =
		!queryAggregation.metricName || queryAggregation.metricName === '';

	return (
		<div
			className={cx('metrics-aggregate-section', {
				'is-histogram': isHistogram,
			})}
		>
			{!isHistogram && (
				<div className="non-histogram-container">
					<div className="metrics-time-aggregation-section">
						<div className="metrics-aggregation-section-content">
							<div className="metrics-aggregation-section-content-item">
								<Tooltip
									title={
										<a
											href="https://signoz.io/docs/metrics-management/types-and-aggregation/#aggregation"
											target="_blank"
											rel="noopener noreferrer"
											style={{ color: '#1890ff', textDecoration: 'underline' }}
										>
											{t('metrics_aggregate.learn_more_temporal')}
										</a>
									}
								>
									<div className="metrics-aggregation-section-content-item-label main-label">
										{t('metrics_aggregate.within_time_series')}{' '}
									</div>
								</Tooltip>
								<div className="metrics-aggregation-section-content-item-value">
									<OperatorsSelect
										value={queryAggregation.timeAggregation || ''}
										onChange={handleChangeOperator}
										operators={operators}
										className="metrics-operators-select"
									/>
								</div>
							</div>

							{showAggregationInterval && (
								<div className="metrics-aggregation-section-content-item">
									<Tooltip
										title={
											<div>
												{t('metrics_aggregate.set_time_interval')}
												<br />
												<a
													href="https://signoz.io/docs/userguide/query-builder-v5/#temporal-aggregation-within-each-time-series"
													target="_blank"
													rel="noopener noreferrer"
													style={{ color: '#1890ff', textDecoration: 'underline' }}
												>
													{t('metrics_aggregate.learn_about_step_intervals')}
												</a>
											</div>
										}
										placement="top"
									>
										<div
											className="metrics-aggregation-section-content-item-label"
											style={{ cursor: 'help' }}
										>
											{t('every')}
										</div>
									</Tooltip>

									<div className="metrics-aggregation-section-content-item-value">
										<InputWithLabel
											onChange={handleChangeAggregateEvery}
											label={t('seconds')}
											placeholder={t('auto')}
											labelAfter
											initialValue={query?.stepInterval ?? null}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="metrics-space-aggregation-section">
						<div className="metrics-aggregation-section-content">
							<div className="metrics-aggregation-section-content-item">
								<Tooltip
									title={
										<a
											href="https://signoz.io/docs/metrics-management/types-and-aggregation/#aggregation"
											target="_blank"
											rel="noopener noreferrer"
											style={{ color: '#1890ff', textDecoration: 'underline' }}
										>
											{t('metrics_aggregate.learn_more_spatial')}
										</a>
									}
								>
									<div className="metrics-aggregation-section-content-item-label main-label">
										{t('metrics_aggregate.across_time_series')}
									</div>
								</Tooltip>
								<div className="metrics-aggregation-section-content-item-value">
									<SpaceAggregationOptions
										panelType={panelType}
										key={`${panelType}${queryAggregation.spaceAggregation}${queryAggregation.timeAggregation}`}
										aggregatorAttributeType={
											query?.aggregateAttribute?.type as ATTRIBUTE_TYPES
										}
										selectedValue={queryAggregation.spaceAggregation || ''}
										disabled={disableOperatorSelector}
										onSelect={handleSpaceAggregationChange}
										operators={spaceAggregationOptions}
										qbVersion="v3"
									/>
								</div>
							</div>

							<div className="metrics-aggregation-section-content-item">
								<div className="metrics-aggregation-section-content-item-label">
									{t('by')}
								</div>

								<div className="metrics-aggregation-section-content-item-value group-by-filter-container">
									<GroupByFilter
										disabled={!queryAggregation.metricName}
										query={query}
										onChange={handleChangeGroupByKeys}
										signalSource={signalSource}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{isHistogram && (
				<div className="metrics-space-aggregation-section">
					<div className="metrics-aggregation-section-content">
						<div className="metrics-aggregation-section-content-item">
							<div className="metrics-aggregation-section-content-item-value">
								<SpaceAggregationOptions
									panelType={panelType}
									key={`${panelType}${queryAggregation.spaceAggregation}${queryAggregation.timeAggregation}`}
									aggregatorAttributeType={
										query?.aggregateAttribute?.type as ATTRIBUTE_TYPES
									}
									selectedValue={queryAggregation.spaceAggregation || ''}
									disabled={disableOperatorSelector}
									onSelect={handleSpaceAggregationChange}
									operators={spaceAggregationOptions}
									qbVersion="v3"
								/>
							</div>
						</div>

						<div className="metrics-aggregation-section-content-item">
							<div className="metrics-aggregation-section-content-item-label">
								{t('by')}
							</div>

							<div className="metrics-aggregation-section-content-item-value group-by-filter-container">
								<GroupByFilter
									disabled={!queryAggregation.metricName}
									query={query}
									onChange={handleChangeGroupByKeys}
									signalSource={signalSource}
								/>
							</div>
						</div>
						<div className="metrics-aggregation-section-content-item">
							<Tooltip
								title={
									<div>
										{t('metrics_aggregate.set_time_interval')}
										<br />
										<a
											href="https://signoz.io/docs/userguide/query-builder-v5/#temporal-aggregation-within-each-time-series"
											target="_blank"
											rel="noopener noreferrer"
											style={{ color: '#1890ff', textDecoration: 'underline' }}
										>
											{t('metrics_aggregate.learn_about_step_intervals')}
										</a>
									</div>
								}
								placement="top"
							>
								<div
									className="metrics-aggregation-section-content-item-label"
									style={{ cursor: 'help' }}
								>
									{t('every')}
								</div>
							</Tooltip>

							<div className="metrics-aggregation-section-content-item-value">
								<InputWithLabel
									onChange={handleChangeAggregateEvery}
									label={t('seconds')}
									placeholder={t('auto')}
									labelAfter
									initialValue={query?.stepInterval ?? null}
									className="histogram-every-input"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});

export default MetricsAggregateSection;
