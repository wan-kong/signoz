import i18n from 'ReactI18';
import { FunnelStepData, LatencyOptions } from 'types/api/traceFunnels';
import { v4 } from 'uuid';

export const createInitialStepsData = (): FunnelStepData[] => [
	{
		id: v4(),
		step_order: 1,
		service_name: '',
		span_name: '',
		filters: {
			items: [],
			op: 'and',
		},
		latency_pointer: 'start',
		has_errors: false,
	},
	{
		id: v4(),
		step_order: 2,
		service_name: '',
		span_name: '',
		filters: {
			items: [],
			op: 'and',
		},
		latency_pointer: 'end',
		latency_type: LatencyOptions.P95,
		has_errors: false,
	},
];

export const createSingleStepData = (): FunnelStepData[] => [
	{
		id: v4(),
		step_order: 1,
		service_name: '',
		span_name: '',
		filters: {
			items: [],
			op: 'and',
		},
		latency_pointer: 'start',
		has_errors: false,
	},
];

export const LatencyPointers: {
	value: FunnelStepData['latency_pointer'];
	key: string;
}[] = [
	{
		value: 'start',
		key: i18n.t('funnel.start_of_span', 'Start of span', { ns: 'common' }),
	},
	{
		value: 'end',
		key: i18n.t('funnel.end_of_span', 'End of span', { ns: 'common' }),
	},
];
