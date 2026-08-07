import i18n from 'ReactI18';
import {
	MetrictypesTemporalityDTO,
	MetrictypesTypeDTO,
} from 'api/generated/services/sigNoz.schemas';

export const METRIC_METADATA_KEYS = {
	description: i18n.t('metrics_explorer.metadata_description', 'Description'),
	unit: i18n.t('metrics_explorer.metadata_unit', 'Unit'),
	type: i18n.t('metrics_explorer.metadata_metric_type', 'Metric Type'),
	temporality: i18n.t('metrics_explorer.metadata_temporality', 'Temporality'),
	isMonotonic: i18n.t('metrics_explorer.metadata_monotonic', 'Monotonic'),
};

export const METRIC_METADATA_TEMPORALITY_OPTIONS: Array<{
	value: MetrictypesTemporalityDTO;
	label: string;
}> = [
	{
		value: MetrictypesTemporalityDTO.delta,
		label: i18n.t('metrics_explorer.metadata_delta', 'Delta'),
	},
	{
		value: MetrictypesTemporalityDTO.cumulative,
		label: i18n.t('metrics_explorer.metadata_cumulative', 'Cumulative'),
	},
];

export const METRIC_METADATA_TYPE_OPTIONS: Array<{
	value: MetrictypesTypeDTO;
	label: string;
}> = [
	{
		value: MetrictypesTypeDTO.sum,
		label: i18n.t('metrics_explorer.metadata_sum', 'Sum'),
	},
	{
		value: MetrictypesTypeDTO.gauge,
		label: i18n.t('metrics_explorer.metadata_gauge', 'Gauge'),
	},
	{
		value: MetrictypesTypeDTO.histogram,
		label: i18n.t('metrics_explorer.metadata_histogram', 'Histogram'),
	},
	{
		value: MetrictypesTypeDTO.summary,
		label: i18n.t('metrics_explorer.metadata_summary', 'Summary'),
	},
	{
		value: MetrictypesTypeDTO.exponentialhistogram,
		label: i18n.t(
			'metrics_explorer.metadata_exponential_histogram',
			'Exponential Histogram',
		),
	},
];

export const METRIC_METADATA_UPDATE_ERROR_MESSAGE = i18n.t(
	'metrics_explorer.metadata_update_error',
	'Failed to update metadata, please try again. If the issue persists, please contact support.',
);
