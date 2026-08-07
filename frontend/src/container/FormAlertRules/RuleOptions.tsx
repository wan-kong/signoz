import { useTranslation } from 'react-i18next';
import {
	Checkbox,
	Collapse,
	Form,
	InputNumber,
	InputNumberProps,
	Select,
	SelectProps,
	Space,
} from 'antd';
import { Typography } from '@signozhq/ui/typography';
import type { DefaultOptionType } from 'antd/es/select';
import {
	getCategoryByOptionId,
	getCategorySelectOptionByName,
} from 'container/CreateAlertV2/AlertCondition/utils';
import {
	AlertDef,
	defaultAlgorithm,
	defaultCompareOp,
	defaultEvalWindow,
	defaultFrequency,
	defaultMatchType,
	defaultSeasonality,
} from 'types/api/alerts/def';
import { EQueryType } from 'types/common/dashboard';
import { popupContainer } from 'utils/selectPopupContainer';

import { AlertDetectionTypes } from '.';
import {
	FormContainer,
	InlineSelect,
	StepHeading,
	VerticalLine,
} from './styles';

import './RuleOptions.styles.scss';

function RuleOptions({
	alertDef,
	setAlertDef,
	queryCategory,
	queryOptions,
	yAxisUnit,
}: RuleOptionsProps): JSX.Element {
	// init namespace for translations
	const { t } = useTranslation('alerts');

	const { ruleType } = alertDef;

	const handleMatchOptChange = (value: string | unknown): void => {
		const m = (value as string) || alertDef.condition?.matchType;
		setAlertDef({
			...alertDef,
			condition: {
				...alertDef.condition,
				matchType: m,
			},
		});
	};

	const onChangeSelectedQueryName = (value: string | unknown): void => {
		if (typeof value !== 'string') {
			return;
		}

		setAlertDef({
			...alertDef,
			condition: {
				...alertDef.condition,
				selectedQueryName: value,
			},
		});
	};

	const renderCompareOps = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultCompareOp}
			value={alertDef.condition?.op}
			style={{ minWidth: '120px' }}
			onChange={(value: string | unknown): void => {
				const newOp = (value as string) || '';

				setAlertDef({
					...alertDef,
					condition: {
						...alertDef.condition,
						op: newOp,
					},
				});
			}}
		>
			<Select.Option value="1">{t('option_above', 'above')}</Select.Option>
			<Select.Option value="2">{t('option_below', 'below')}</Select.Option>

			{/* hide equal and not eqaul in case of analmoy based alert */}

			{ruleType !== 'anomaly_rule' && (
				<>
					<Select.Option value="3">{t('option_equal', 'is equal to')}</Select.Option>
					<Select.Option value="4">
						{t('option_notequal', 'not equal to')}
					</Select.Option>
				</>
			)}
			{/* the value 5 and 6 are reserved for above or equal and below or equal */}
			{ruleType === 'anomaly_rule' && (
				<Select.Option value="7">
					{t('option_above_below', 'above/below')}
				</Select.Option>
			)}
		</InlineSelect>
	);

	const renderMatchOpts = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultMatchType}
			style={{ minWidth: '130px' }}
			value={alertDef.condition?.matchType}
			onChange={(value: string | unknown): void => handleMatchOptChange(value)}
		>
			<Select.Option value="1">
				{t('option_atleastonce', 'at least once')}
			</Select.Option>
			<Select.Option value="2">
				{t('option_allthetimes', 'all the times')}
			</Select.Option>

			{ruleType !== 'anomaly_rule' && (
				<>
					<Select.Option value="3">
						{t('option_onaverage', 'on average')}
					</Select.Option>
					<Select.Option value="4">{t('option_intotal', 'in total')}</Select.Option>
					<Select.Option value="5">{t('option_last', 'last')}</Select.Option>
				</>
			)}
		</InlineSelect>
	);

	const onChangeEvalWindow = (value: string | unknown): void => {
		const ew = (value as string) || alertDef.evalWindow;
		setAlertDef({
			...alertDef,
			evalWindow: ew,
		});
	};

	const onChangeAlgorithm = (value: string | unknown): void => {
		const alg = (value as string) || alertDef.condition.algorithm;
		setAlertDef({
			...alertDef,
			condition: {
				...alertDef.condition,
				algorithm: alg,
			},
		});
	};

	const onChangeSeasonality = (value: string | unknown): void => {
		const seasonality = (value as string) || alertDef.condition.seasonality;
		setAlertDef({
			...alertDef,
			condition: {
				...alertDef.condition,
				seasonality,
			},
		});
	};

	const onChangeDeviation = (value: number): void => {
		const target = value || alertDef.condition.target || 3;

		setAlertDef({
			...alertDef,
			condition: { ...alertDef.condition, target: Number(target) },
		});
	};

	const renderEvalWindows = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultEvalWindow}
			style={{ minWidth: '120px' }}
			value={alertDef.evalWindow}
			onChange={onChangeEvalWindow}
		>
			<Select.Option value="5m0s">{t('option_5min', '5 mins')}</Select.Option>
			<Select.Option value="10m0s">{t('option_10min', '10 mins')}</Select.Option>
			<Select.Option value="15m0s">{t('option_15min', '15 mins')}</Select.Option>
			<Select.Option value="1h0m0s">{t('option_60min', '60 mins')}</Select.Option>
			<Select.Option value="4h0m0s">{t('option_4hours', '4 hours')}</Select.Option>
			<Select.Option value="24h0m0s">
				{t('option_24hours', '24 hours')}
			</Select.Option>
		</InlineSelect>
	);

	const renderPromEvalWindows = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultEvalWindow}
			style={{ minWidth: '120px' }}
			value={alertDef.evalWindow}
			onChange={onChangeEvalWindow}
		>
			<Select.Option value="5m0s">{t('option_5min', '5 mins')}</Select.Option>
			<Select.Option value="10m0s">{t('option_10min', '10 mins')}</Select.Option>
			<Select.Option value="15m0s">{t('option_15min', '15 mins')}</Select.Option>
		</InlineSelect>
	);

	const renderAlgorithms = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultAlgorithm}
			style={{ minWidth: '120px' }}
			value={alertDef.condition.algorithm}
			onChange={onChangeAlgorithm}
		>
			<Select.Option value="standard">
				{t('option_standard', 'Standard')}
			</Select.Option>
		</InlineSelect>
	);

	const renderDeviationOpts = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={3}
			style={{ minWidth: '120px' }}
			value={alertDef.condition.target}
			onChange={(value: number | unknown): void => {
				if (typeof value === 'number') {
					onChangeDeviation(value);
				}
			}}
		>
			<Select.Option value={1}>1</Select.Option>
			<Select.Option value={2}>2</Select.Option>
			<Select.Option value={3}>3</Select.Option>
			<Select.Option value={4}>4</Select.Option>
			<Select.Option value={5}>5</Select.Option>
			<Select.Option value={6}>6</Select.Option>
			<Select.Option value={7}>7</Select.Option>
		</InlineSelect>
	);

	const renderSeasonality = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultSeasonality}
			style={{ minWidth: '120px' }}
			value={alertDef.condition.seasonality}
			onChange={onChangeSeasonality}
		>
			<Select.Option value="hourly">{t('option_hourly', 'Hourly')}</Select.Option>
			<Select.Option value="daily">{t('option_daily', 'Daily')}</Select.Option>
			<Select.Option value="weekly">{t('option_weekly', 'Weekly')}</Select.Option>
		</InlineSelect>
	);

	const renderThresholdRuleOpts = (): JSX.Element => (
		<Form.Item>
			<Typography.Text>
				{t('text_condition1', 'Send a notification when')}
				<InlineSelect
					getPopupContainer={popupContainer}
					allowClear
					showSearch
					options={queryOptions}
					placeholder={t('selected_query_placeholder', 'Select query')}
					value={alertDef.condition.selectedQueryName}
					onChange={onChangeSelectedQueryName}
				/>
				<Typography.Text>{t('text_is', 'is')}</Typography.Text>
				{renderCompareOps()} {t('text_condition2', 'the threshold')}{' '}
				{renderMatchOpts()} {t('text_condition3', 'during the last')}{' '}
				{renderEvalWindows()}
			</Typography.Text>
		</Form.Item>
	);

	const renderPromRuleOptions = (): JSX.Element => (
		<Form.Item>
			<Typography.Text>
				{t('text_condition1', 'Send a notification when')}
				<InlineSelect
					getPopupContainer={popupContainer}
					allowClear
					showSearch
					options={queryOptions}
					placeholder={t('selected_query_placeholder', 'Select query')}
					value={alertDef.condition.selectedQueryName}
					onChange={onChangeSelectedQueryName}
				/>
				<Typography.Text>{t('text_is', 'is')}</Typography.Text>
				{renderCompareOps()} {t('text_condition2', 'the threshold')}{' '}
				{renderMatchOpts()}
				{t('text_condition3', 'during the last')} {renderPromEvalWindows()}
			</Typography.Text>
		</Form.Item>
	);

	const onChange: InputNumberProps['onChange'] = (value): void => {
		setAlertDef({
			...alertDef,
			condition: {
				...alertDef.condition,
				op: alertDef.condition?.op || defaultCompareOp,
				matchType: alertDef.condition?.matchType || defaultMatchType,
				target: Number(value) || 0,
			},
		});
	};

	const onChangeAlertUnit: SelectProps['onChange'] = (value) => {
		setAlertDef({
			...alertDef,
			condition: {
				...alertDef.condition,
				targetUnit: value as string,
			},
		});
	};

	const onChangeFrequency = (value: string | unknown): void => {
		const freq = (value as string) || alertDef.frequency;
		setAlertDef({
			...alertDef,
			frequency: freq,
		});
	};

	const renderAnomalyRuleOpts = (): JSX.Element => (
		<Form.Item>
			<Typography.Text className="rule-definition">
				{t(
					'text_condition1_anomaly',
					'Send notification when the observed value for',
				)}
				<InlineSelect
					getPopupContainer={popupContainer}
					allowClear
					showSearch
					options={queryOptions}
					placeholder={t('selected_query_placeholder', 'Select query')}
					value={alertDef.condition.selectedQueryName}
					onChange={onChangeSelectedQueryName}
				/>
				{t('text_condition3', 'during the last')} {renderEvalWindows()}
				<Typography.Text>{t('text_is', 'is')}</Typography.Text>
				{renderDeviationOpts()}
				<Typography.Text>{t('anomaly_deviations', 'deviations')}</Typography.Text>
				{renderCompareOps()}
				<Typography.Text>
					{t('anomaly_predicted_data', 'the predicted data')}
				</Typography.Text>
				{renderMatchOpts()}
				{t('anomaly_using_the', 'using the')} {renderAlgorithms()}{' '}
				{t('anomaly_algorithm_with', 'algorithm with')} {renderSeasonality()}{' '}
				{t('anomaly_seasonality', 'seasonality')}
			</Typography.Text>
		</Form.Item>
	);

	const renderFrequency = (): JSX.Element => (
		<InlineSelect
			getPopupContainer={popupContainer}
			defaultValue={defaultFrequency}
			style={{ minWidth: '120px' }}
			value={alertDef.frequency}
			onChange={onChangeFrequency}
		>
			<Select.Option value="1m0s">{t('option_1min', '1 min')}</Select.Option>
			<Select.Option value="5m0s">{t('option_5min', '5 mins')}</Select.Option>
			<Select.Option value="10m0s">{t('option_10min', '10 mins')}</Select.Option>
			<Select.Option value="15m0s">{t('option_15min', '15 mins')}</Select.Option>
			<Select.Option value="30m0s">{t('option_30min', '30 mins')}</Select.Option>
			<Select.Option value="1h0m0s">{t('option_60min', '60 mins')}</Select.Option>
			<Select.Option value="3h0m0s">{t('option_3hours', '3 hours')}</Select.Option>
			<Select.Option value="6h0m0s">{t('option_6hours', '6 hours')}</Select.Option>
			<Select.Option value="12h0m0s">
				{t('option_12hours', '12 hours')}
			</Select.Option>
			<Select.Option value="24h0m0s">
				{t('option_24hours', '24 hours')}
			</Select.Option>
		</InlineSelect>
	);

	const selectedCategory = getCategoryByOptionId(yAxisUnit);

	const categorySelectOptions = getCategorySelectOptionByName(selectedCategory);

	const step3Label = alertDef.alertType === 'METRIC_BASED_ALERT' ? '3' : '2';

	return (
		<>
			<StepHeading>
				{t('alert_form_step3', 'Define Alert Conditions', { step: step3Label })}
			</StepHeading>
			<FormContainer>
				{queryCategory === EQueryType.PROM && renderPromRuleOptions()}
				{queryCategory !== EQueryType.PROM &&
					ruleType === AlertDetectionTypes.ANOMALY_DETECTION_ALERT && (
						<>{renderAnomalyRuleOpts()}</>
					)}

				{queryCategory !== EQueryType.PROM &&
					ruleType === AlertDetectionTypes.THRESHOLD_ALERT &&
					renderThresholdRuleOpts()}

				<Space direction="vertical" size="large">
					{ruleType !== AlertDetectionTypes.ANOMALY_DETECTION_ALERT && (
						<Space direction="horizontal" align="center">
							<Form.Item noStyle>
								<InputNumber
									addonBefore={t('field_threshold', 'Alert Threshold')}
									value={alertDef?.condition?.target}
									onChange={onChange}
									type="number"
									onWheel={(e): void => e.currentTarget.blur()}
								/>
							</Form.Item>

							<Form.Item noStyle>
								<Select
									className="rule-unit-selector"
									getPopupContainer={popupContainer}
									allowClear
									showSearch
									options={categorySelectOptions}
									placeholder={t('field_unit', 'Threshold unit')}
									value={alertDef.condition.targetUnit}
									onChange={onChangeAlertUnit}
								/>
							</Form.Item>
						</Space>
					)}

					<Collapse>
						<Collapse.Panel header={t('more_options', 'More options')} key="1">
							<Space direction="vertical" size="large">
								<VerticalLine>
									<Space direction="horizontal" align="center">
										<Typography.Text>
											{t('text_alert_frequency', 'Run alert every')}
										</Typography.Text>
										{renderFrequency()}
									</Space>
								</VerticalLine>

								<VerticalLine>
									<Space direction="horizontal" align="center">
										<Form.Item noStyle name={['condition', 'alertOnAbsent']}>
											<Checkbox
												checked={alertDef?.condition?.alertOnAbsent}
												onChange={(e): void => {
													setAlertDef({
														...alertDef,
														condition: {
															...alertDef.condition,
															alertOnAbsent: e.target.checked,
														},
													});
												}}
											/>
										</Form.Item>
										<Typography.Text>
											{t(
												'text_alert_on_absent',
												'Send a notification if data is missing for',
											)}
										</Typography.Text>

										<Form.Item noStyle name={['condition', 'absentFor']}>
											<InputNumber
												min={1}
												value={alertDef?.condition?.absentFor}
												onChange={(value): void => {
													setAlertDef({
														...alertDef,
														condition: {
															...alertDef.condition,
															absentFor: Number(value) || 0,
														},
													});
												}}
												type="number"
												onWheel={(e): void => e.currentTarget.blur()}
											/>
										</Form.Item>
										<Typography.Text>{t('text_for', 'minutes')}</Typography.Text>
									</Space>
								</VerticalLine>

								<VerticalLine>
									<Space direction="horizontal" align="center">
										<Form.Item noStyle name={['condition', 'requireMinPoints']}>
											<Checkbox
												checked={alertDef?.condition?.requireMinPoints}
												onChange={(e): void => {
													setAlertDef({
														...alertDef,
														condition: {
															...alertDef.condition,
															requireMinPoints: e.target.checked,
														},
													});
												}}
											/>
										</Form.Item>
										<Typography.Text>
											{t(
												'text_require_min_points',
												'Run alert evaluation only when there are minimum of',
											)}
										</Typography.Text>

										<Form.Item noStyle name={['condition', 'requiredNumPoints']}>
											<InputNumber
												min={1}
												value={alertDef?.condition?.requiredNumPoints}
												onChange={(value): void => {
													setAlertDef({
														...alertDef,
														condition: {
															...alertDef.condition,
															requiredNumPoints: Number(value) || 0,
														},
													});
												}}
												type="number"
												onWheel={(e): void => e.currentTarget.blur()}
											/>
										</Form.Item>
										<Typography.Text>
											{t('text_num_points', 'data points in each result group')}
										</Typography.Text>
									</Space>
								</VerticalLine>
							</Space>
						</Collapse.Panel>
					</Collapse>
				</Space>
			</FormContainer>
		</>
	);
}

interface RuleOptionsProps {
	alertDef: AlertDef;
	setAlertDef: (a: AlertDef) => void;
	queryCategory: EQueryType;
	queryOptions: DefaultOptionType[];
	yAxisUnit: string;
}
export default RuleOptions;
