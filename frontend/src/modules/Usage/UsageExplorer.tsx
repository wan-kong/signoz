//@ts-nocheck

import { useEffect, useState } from 'react';
import i18n from 'ReactI18';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-restricted-imports
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select, Space } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import Graph from 'components/Graph';
import { GetService, getUsageData, UsageDataItem } from 'store/actions';
import { AppState } from 'store/reducers';
import { GlobalTime } from 'types/actions/globalTime';
import { GlobalReducer } from 'types/reducer/globalTime';
import MetricReducer from 'types/reducer/metrics';
import { isOnboardingSkipped } from 'utils/app';

import { Card } from './styles';

const { Option } = Select;

interface UsageExplorerProps {
	usageData: UsageDataItem[];
	getUsageData: (
		minTime: number,
		maxTime: number,
		selectedInterval: number,
		selectedService: string,
	) => void;
	getServicesList: ({
		selectedTimeInterval,
	}: {
		selectedTimeInterval: GlobalReducer['selectedTime'];
	}) => void;
	globalTime: GlobalTime;
	servicesList: servicesListItem[];
	totalCount: number;
}
const timeDaysOptions = [
	{
		value: 30,
		label: i18n.t('usage.last_30_days', 'Last 30 Days', { ns: 'common' }),
	},
	{ value: 7, label: i18n.t('usage.last_week', 'Last week', { ns: 'common' }) },
	{ value: 1, label: i18n.t('usage.last_day', 'Last day', { ns: 'common' }) },
];

const interval = [
	{
		value: 604800,
		chartDivideMultiplier: 1,
		label: i18n.t('usage.weekly', 'Weekly', { ns: 'common' }),
		applicableOn: [timeDaysOptions[0]],
	},
	{
		value: 86400,
		chartDivideMultiplier: 30,
		label: i18n.t('usage.daily', 'Daily', { ns: 'common' }),
		applicableOn: [timeDaysOptions[0], timeDaysOptions[1]],
	},
	{
		value: 3600,
		chartDivideMultiplier: 10,
		label: i18n.t('usage.hours', 'Hours', { ns: 'common' }),
		applicableOn: [timeDaysOptions[2], timeDaysOptions[1]],
	},
];

function _UsageExplorer(props: UsageExplorerProps): JSX.Element {
	const { t } = useTranslation('common');
	const [selectedTime, setSelectedTime] = useState(timeDaysOptions[1]);
	const [selectedInterval, setSelectedInterval] = useState(interval[2]);
	const [selectedService, setSelectedService] = useState<string>('');
	const { selectedTime: globalSelectedTime } = useSelector<
		AppState,
		GlobalReducer
	>((state) => state.globalTime);
	const { getServicesList, getUsageData, globalTime, totalCount, usageData } =
		props;
	const { services } = useSelector<AppState, MetricReducer>(
		(state) => state.metrics,
	);

	useEffect(() => {
		if (selectedTime && selectedInterval) {
			const maxTime = new Date().getTime() * 1000000;
			const minTime = maxTime - selectedTime.value * 24 * 3600000 * 1000000;

			getUsageData(minTime, maxTime, selectedInterval.value, selectedService);
		}
	}, [selectedTime, selectedInterval, selectedService, getUsageData]);

	useEffect(() => {
		getServicesList({
			selectedTimeInterval: globalSelectedTime,
		});
	}, [globalTime, getServicesList, globalSelectedTime]);

	const data = {
		labels: usageData.map((s) => new Date(s.timestamp / 1000000)),
		datasets: [
			{
				label: t('usage.span_count', 'Span Count'),
				data: usageData.map((s) => s.count),
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 2,
			},
		],
	};

	return (
		<>
			<Space style={{ marginTop: 40, marginLeft: 20 }}>
				<Space>
					<Select
						onSelect={(value): void => {
							setSelectedTime(
								// eslint-disable-next-line eqeqeq
								timeDaysOptions.filter((item) => item.value == parseInt(value))[0],
							);
						}}
						value={selectedTime.label}
					>
						{timeDaysOptions.map(({ value, label }) => (
							<Option key={value} value={value}>
								{label}
							</Option>
						))}
					</Select>
				</Space>
				<Space>
					<Select
						onSelect={(value): void => {
							setSelectedInterval(
								interval.filter((item) => item.value === parseInt(value))[0],
							);
						}}
						value={selectedInterval.label}
					>
						{interval
							.filter((interval) => interval.applicableOn.includes(selectedTime))
							.map((item) => (
								<Option key={item.label} value={item.value}>
									{item.label}
								</Option>
							))}
					</Select>
				</Space>

				<Space>
					<Select
						onSelect={(value): void => {
							setSelectedService(value);
						}}
						value={selectedService || t('usage.all_services', 'All Services')}
					>
						<Option value="">{t('usage.all_services', 'All Services')}</Option>
						{services?.map((service) => (
							<Option key={service.serviceName} value={service.serviceName}>
								{service.serviceName}
							</Option>
						))}
					</Select>
				</Space>

				{isOnboardingSkipped() && totalCount === 0 ? (
					<Space
						style={{
							width: '100%',
							margin: '40px 0',
							marginLeft: 20,
							justifyContent: 'center',
						}}
					>
						<Typography>
							{t(
								'usage.no_spans_found',
								'No spans found. Please add instrumentation (follow this',
							)}
							<a
								href="https://signoz.io/docs/instrumentation/overview"
								target="_blank"
								style={{ marginLeft: 3 }}
								rel="noreferrer"
							>
								{t('usage.guide', 'guide')}
							</a>
							)
						</Typography>
					</Space>
				) : (
					<Space style={{ display: 'block', marginLeft: 20, width: 200 }}>
						<Typography>
							{t('usage.total_count', 'Total count is {{totalCount}}', { totalCount })}
						</Typography>
					</Space>
				)}
			</Space>

			<Card>
				<Graph name="usage" data={data} type="bar" />
			</Card>
		</>
	);
}

const mapStateToProps = (
	state: AppState,
): {
	totalCount: number;
	globalTime: GlobalTime;
	usageData: UsageDataItem[];
} => {
	let totalCount = 0;
	for (const item of state.usageDate) {
		totalCount += item.count;
	}
	return {
		totalCount,
		usageData: state.usageDate,
		globalTime: state.globalTime,
	};
};

export const UsageExplorer = withRouter(
	connect(mapStateToProps, {
		getUsageData,
		getServicesList: GetService,
	})(_UsageExplorer),
);
