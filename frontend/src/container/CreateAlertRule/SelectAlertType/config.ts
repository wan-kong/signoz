import { AlertTypes } from 'types/api/alerts/alertTypes';

import { OptionType } from './types';

const baseOptionList: OptionType[] = [
	{
		title: 'metric_based_alert',
		selection: AlertTypes.METRICS_BASED_ALERT,
		description: 'metric_based_alert_desc',
	},
	{
		title: 'log_based_alert',
		selection: AlertTypes.LOGS_BASED_ALERT,
		description: 'log_based_alert_desc',
	},
	{
		title: 'traces_based_alert',
		selection: AlertTypes.TRACES_BASED_ALERT,
		description: 'traces_based_alert_desc',
	},
	{
		title: 'exceptions_based_alert',
		selection: AlertTypes.EXCEPTIONS_BASED_ALERT,
		description: 'exceptions_based_alert_desc',
	},
];

export const getOptionList = (
	isAnomalyDetectionEnabled: boolean,
): OptionType[] => {
	const optionList = [...baseOptionList];

	if (isAnomalyDetectionEnabled) {
		optionList.unshift({
			title: 'anomaly_based_alert',
			selection: AlertTypes.ANOMALY_BASED_ALERT,
			description: 'anomaly_based_alert_desc',
			isBeta: true,
		});
	}

	return optionList;
};
