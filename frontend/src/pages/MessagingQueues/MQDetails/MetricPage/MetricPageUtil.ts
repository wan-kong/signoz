import i18n from 'ReactI18';
import { PANEL_TYPES } from 'constants/queryBuilder';
import { GetWidgetQueryBuilderProps } from 'container/MetricsApplication/types';
import { Widgets } from 'types/api/dashboard/getAll';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';
import {
	IBuilderFormula,
	IBuilderQuery,
} from 'types/api/queryBuilder/queryBuilderData';
import { EQueryType } from 'types/common/dashboard';
import { DataSource, ReduceOperators } from 'types/common/queryBuilder';
import { v4 as uuid } from 'uuid';

interface GetWidgetQueryProps {
	title: string;
	description: string;
	queryData: IBuilderQuery[];
	queryFormulas?: IBuilderFormula[];
	panelTypes?: PANEL_TYPES;
	yAxisUnit?: string;
	columnUnits?: Record<string, string>;
}

interface GetWidgetQueryPropsReturn extends GetWidgetQueryBuilderProps {
	description?: string;
	nullZeroValues: string;
	columnUnits?: Record<string, string>;
}

export const getWidgetQueryBuilder = ({
	query,
	title = '',
	panelTypes,
	yAxisUnit = '',
	fillSpans = false,
	id,
	nullZeroValues,
	description,
}: GetWidgetQueryPropsReturn): Widgets => ({
	description: description || '',
	id: id || uuid(),
	nullZeroValues: nullZeroValues || '',
	opacity: '1',
	panelTypes,
	query,
	timePreferance: 'GLOBAL_TIME',
	title,
	yAxisUnit,
	softMax: null,
	softMin: null,
	selectedLogFields: [],
	selectedTracesFields: [],
	fillSpans,
});

export function getWidgetQuery(
	props: GetWidgetQueryProps,
): GetWidgetQueryPropsReturn {
	const { title, description, panelTypes, yAxisUnit, columnUnits } = props;
	return {
		title,
		yAxisUnit: yAxisUnit || 'none',
		panelTypes: panelTypes || PANEL_TYPES.TIME_SERIES,
		fillSpans: false,
		description,
		nullZeroValues: 'zero',
		columnUnits,
		query: {
			queryType: EQueryType.QUERY_BUILDER,
			promql: [],
			builder: {
				queryData: props.queryData,
				queryFormulas: (props.queryFormulas as IBuilderFormula[]) || [],
				queryTraceOperator: [],
			},
			clickhouse_sql: [],
			id: uuid(),
		},
	};
}

export const getRequestTimesWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						// choose key based on flag
						key: dotMetricsEnabled
							? 'kafka.request.time.avg'
							: 'kafka_request_time_avg',
						// mirror into the id as well
						id: 'kafka_request_time_avg--float64--Gauge--true',
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: {
						items: [],
						op: 'AND',
					},
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.request_times', 'Request Times', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.request_times', 'Request Times', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.request_times_desc',
				'This metric is used to measure the average latency experienced by requests across the Kafka broker.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getBrokerCountWidgetData = (dotMetricsEnabled: boolean): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled ? 'kafka.brokers' : 'kafka_brokers',
						id: 'kafka_brokers--float64--Gauge--true',
						type: 'Gauge',
					},
					aggregateOperator: 'sum',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.broker_count_legend', 'Broker count', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'sum',
				},
			],
			title: i18n.t('metric_page.broker_count', 'Broker Count', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.broker_count_desc',
				'Total number of active brokers in the Kafka cluster.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getProducerFetchRequestPurgatoryWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						// inline ternary based on dotMetricsEnabled
						key: dotMetricsEnabled ? 'kafka.purgatory.size' : 'kafka_purgatory_size',
						id: `${
							dotMetricsEnabled ? 'kafka.purgatory.size' : 'kafka_purgatory_size'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t(
						'metric_page.producer_fetch_request_purgatory',
						'Producer and Fetch Request Purgatory',
						{ ns: 'messagingQueues' },
					),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t(
				'metric_page.producer_fetch_request_purgatory',
				'Producer and Fetch Request Purgatory',
				{ ns: 'messagingQueues' },
			),
			description: i18n.t(
				'metric_page.producer_fetch_request_purgatory_desc',
				'Measures the number of requests that Kafka brokers have received but cannot immediately fulfill',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getBrokerNetworkThroughputWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						// inline ternary based on dotMetricsEnabled
						key: dotMetricsEnabled
							? 'kafka_server_brokertopicmetrics_total_replicationbytesinpersec_oneminuterate'
							: 'kafka_server_brokertopicmetrics_bytesoutpersec_oneminuterate',
						id: `${
							dotMetricsEnabled
								? 'kafka_server_brokertopicmetrics_total_replicationbytesinpersec_oneminuterate'
								: 'kafka_server_brokertopicmetrics_bytesoutpersec_oneminuterate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t(
						'metric_page.broker_network_throughput',
						'Broker Network Throughput',
						{ ns: 'messagingQueues' },
					),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t(
				'metric_page.broker_network_throughput',
				'Broker Network Throughput',
				{ ns: 'messagingQueues' },
			),
			description: i18n.t(
				'metric_page.broker_network_throughput_desc',
				'Helps gauge the data throughput from the Kafka broker to consumer clients, focusing on the network usage associated with serving messages to consumers.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getIoWaitTimeWidgetData = (dotMetricsEnabled: boolean): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						// inline ternary based on dotMetricsEnabled
						key: dotMetricsEnabled
							? 'kafka.producer.io_waittime_total'
							: 'kafka_producer_io_waittime_total',
						id: `${
							dotMetricsEnabled
								? 'kafka.producer.io_waittime_total'
								: 'kafka_producer_io_waittime_total'
						}--float64--Sum--true`,
						type: 'Sum',
					},
					aggregateOperator: 'rate',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.io_wait_time', 'I/O Wait Time', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'sum',
					stepInterval: 60,
					timeAggregation: 'rate',
				},
			],
			title: i18n.t('metric_page.io_wait_time', 'I/O Wait Time', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.io_wait_time_desc',
				'This metric measures the total time that producers are in an I/O wait state, indicating potential bottlenecks in data transmission from producers to Kafka brokers.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getRequestResponseWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.producer.request_rate'
							: 'kafka_producer_request_rate',
						id: `${
							dotMetricsEnabled
								? 'kafka.producer.request_rate'
								: 'kafka_producer_request_rate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.request_rate_legend', 'Request Rate', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.producer.response_rate'
							: 'kafka_producer_response_rate',
						id: `${
							dotMetricsEnabled
								? 'kafka.producer.response_rate'
								: 'kafka_producer_response_rate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'B',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.response_rate_legend', 'Response Rate', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'B',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t(
				'metric_page.request_response_rate',
				'Request and Response Rate',
				{
					ns: 'messagingQueues',
				},
			),
			description: i18n.t(
				'metric_page.request_response_rate_desc',
				"Indicates how many requests the producer is sending per second, reflecting the intensity of the producer's interaction with the Kafka cluster. Also, helps Kafka administrators gauge the responsiveness of brokers to producer requests.",
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getAverageRequestLatencyWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.producer.request_latency_avg'
							: 'kafka_producer_request_latency_avg',
						id: `${
							dotMetricsEnabled
								? 'kafka.producer.request_latency_avg'
								: 'kafka_producer_request_latency_avg'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t(
						'metric_page.avg_request_latency',
						'Average Request Latency',
						{
							ns: 'messagingQueues',
						},
					),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.avg_request_latency', 'Average Request Latency', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.avg_request_latency_desc',
				'Helps Kafka administrators and developers understand the average latency experienced by producer requests.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getKafkaProducerByteRateWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.producer.byte_rate'
							: 'kafka_producer_byte_rate',
						id: `${
							dotMetricsEnabled
								? 'kafka.producer.byte_rate'
								: 'kafka_producer_byte_rate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: dotMetricsEnabled
				? 'kafka.producer.byte_rate'
				: 'kafka_producer_byte_rate',
			description: i18n.t(
				'metric_page.producer_byte_rate_desc',
				'Helps measure the data output rate from the producer, indicating the load a producer is placing on Kafka brokers.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getBytesConsumedWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.consumer.bytes_consumed_rate'
							: 'kafka_consumer_bytes_consumed_rate',
						id: `${
							dotMetricsEnabled
								? 'kafka.consumer.bytes_consumed_rate'
								: 'kafka_consumer_bytes_consumed_rate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.bytes_consumed', 'Bytes Consumed', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			// Use kebab-case title as requested
			title: i18n.t('metric_page.bytes_consumed', 'Bytes Consumed', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.bytes_consumed_desc',
				'Helps Kafka administrators monitor the data consumption rate of a consumer group, showing how much data (in bytes) is being read from the Kafka cluster over time.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getConsumerOffsetWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.consumer_group.offset'
							: 'kafka_consumer_group_offset',
						id: `${
							dotMetricsEnabled
								? 'kafka.consumer_group.offset'
								: 'kafka_consumer_group_offset'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'group--string--tag--false',
							key: 'group',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'partition--string--tag--false',
							key: 'partition',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.consumer_offset', 'Consumer Offset', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.consumer_offset_desc',
				'Current offset of each consumer group for each topic partition',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getConsumerGroupMemberWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.consumer_group.members'
							: 'kafka_consumer_group_members',
						id: `${
							dotMetricsEnabled
								? 'kafka.consumer_group.members'
								: 'kafka_consumer_group_members'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'sum',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'group--string--tag--false',
							key: 'group',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'sum',
					stepInterval: 60,
					timeAggregation: 'sum',
				},
			],
			title: i18n.t(
				'metric_page.consumer_group_members',
				'Consumer Group Members',
				{
					ns: 'messagingQueues',
				},
			),
			description: i18n.t(
				'metric_page.consumer_group_members_desc',
				'Number of active users in each group',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getConsumerLagByGroupWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.consumer_group.lag'
							: 'kafka_consumer_group_lag',
						id: `${
							dotMetricsEnabled
								? 'kafka.consumer_group.lag'
								: 'kafka_consumer_group_lag'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'group--string--tag--false',
							key: 'group',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'partition--string--tag--false',
							key: 'partition',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.consumer_lag_by_group', 'Consumer Lag by Group', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.consumer_lag_by_group_desc',
				'Helps Kafka administrators assess whether consumer groups are keeping up with the incoming data stream or falling behind',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getConsumerFetchRateWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.consumer.fetch_rate'
							: 'kafka_consumer_fetch_rate',
						id: `${
							dotMetricsEnabled
								? 'kafka.consumer.fetch_rate'
								: 'kafka_consumer_fetch_rate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'service_name--string--tag--false',
							key: dotMetricsEnabled ? 'service.name' : 'service_name',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.consumer_fetch_rate', 'Consumer Fetch Rate', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.consumer_fetch_rate_desc',
				'Metric measures the rate at which fetch requests are made by a Kafka consumer to the broker, typically in requests per second.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getMessagesConsumedWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.consumer.records_consumed_rate'
							: 'kafka_consumer_records_consumed_rate',
						id: `${
							dotMetricsEnabled
								? 'kafka.consumer.records_consumed_rate'
								: 'kafka_consumer_records_consumed_rate'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.messages_consumed', 'Messages Consumed', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.messages_consumed', 'Messages Consumed', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.messages_consumed_desc',
				'Measures the rate at which a Kafka consumer is consuming records (messages) per second from Kafka brokers.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getJvmGCCountWidgetData = (dotMetricsEnabled: boolean): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'jvm.gc.collections.count'
							: 'jvm_gc_collections_count',
						id: `${
							dotMetricsEnabled
								? 'jvm.gc.collections.count'
								: 'jvm_gc_collections_count'
						}--float64--Sum--true`,
						type: 'Sum',
					},
					aggregateOperator: 'rate',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.jvm_gc_count', 'JVM GC Count', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'sum',
					stepInterval: 60,
					timeAggregation: 'rate',
				},
			],
			title: i18n.t('metric_page.jvm_gc_count', 'JVM GC Count', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.jvm_gc_count_desc',
				'Tracks the total number of garbage collection (GC) events that have occurred in the Java Virtual Machine (JVM).',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getJvmGcCollectionsElapsedWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'jvm.gc.collections.elapsed'
							: 'jvm_gc_collections_elapsed',
						id: `${
							dotMetricsEnabled
								? 'jvm.gc.collections.elapsed'
								: 'jvm_gc_collections_elapsed'
						}--float64--Sum--true`,
						type: 'Sum',
					},
					aggregateOperator: 'rate',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.jvm_gc_elapsed_legend', 'garbagecollector', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'sum',
					stepInterval: 60,
					timeAggregation: 'rate',
				},
			],
			title: dotMetricsEnabled
				? 'jvm.gc.collections.elapsed'
				: 'jvm_gc_collections_elapsed',
			description: i18n.t(
				'metric_page.jvm_gc_elapsed_desc',
				'Measures the total time (usually in milliseconds) spent on garbage collection (GC) events in the Java Virtual Machine (JVM).',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getCpuRecentUtilizationWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'jvm.cpu.recent_utilization'
							: 'jvm_cpu_recent_utilization',
						id: `${
							dotMetricsEnabled
								? 'jvm.cpu.recent_utilization'
								: 'jvm_cpu_recent_utilization'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.cpu_utilization_legend', 'CPU utilization', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t(
				'metric_page.cpu_recent_utilization',
				'CPU Recent Utilization',
				{
					ns: 'messagingQueues',
				},
			),
			description: i18n.t(
				'metric_page.cpu_recent_utilization_desc',
				'This metric measures the recent CPU usage by the Java Virtual Machine (JVM), typically expressed as a percentage.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getJvmMemoryHeapWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled ? 'jvm.memory.heap.max' : 'jvm_memory_heap_max',
						id: `${
							dotMetricsEnabled ? 'jvm.memory.heap.max' : 'jvm_memory_heap_max'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [],
					having: [],
					legend: i18n.t('metric_page.jvm_memory_heap', 'JVM memory heap', {
						ns: 'messagingQueues',
					}),
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.jvm_memory_heap', 'JVM memory heap', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.jvm_memory_heap_desc',
				'The metric represents the maximum amount of heap memory available to the Java Virtual Machine (JVM)',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getPartitionCountPerTopicWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.topic.partitions'
							: 'kafka_topic_partitions',
						id: `${
							dotMetricsEnabled ? 'kafka.topic.partitions' : 'kafka_topic_partitions'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'sum',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'sum',
					stepInterval: 60,
					timeAggregation: 'sum',
				},
			],
			title: i18n.t(
				'metric_page.partition_count_per_topic',
				'Partition Count per Topic',
				{
					ns: 'messagingQueues',
				},
			),
			description: i18n.t(
				'metric_page.partition_count_per_topic_desc',
				'Number of partitions for each topic',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getCurrentOffsetPartitionWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.partition.current_offset'
							: 'kafka_partition_current_offset',
						id: `${
							dotMetricsEnabled
								? 'kafka.partition.current_offset'
								: 'kafka_partition_current_offset'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'partition--string--tag--false',
							key: 'partition',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t(
				'metric_page.current_offset_partition',
				'Current Offset ( Partition )',
				{
					ns: 'messagingQueues',
				},
			),
			description: i18n.t(
				'metric_page.current_offset_partition_desc',
				'Current offset of each partition, showing the latest position in each partition',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getOldestOffsetWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.partition.oldest_offset'
							: 'kafka_partition_oldest_offset',
						id: `${
							dotMetricsEnabled
								? 'kafka.partition.oldest_offset'
								: 'kafka_partition_oldest_offset'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'partition--string--tag--false',
							key: 'partition',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t(
				'metric_page.oldest_offset_partition',
				'Oldest Offset (Partition)',
				{
					ns: 'messagingQueues',
				},
			),
			description: i18n.t(
				'metric_page.oldest_offset_partition_desc',
				'Oldest offset of each partition to identify log retention and offset range.',
				{ ns: 'messagingQueues' },
			),
		}),
	);

export const getInsyncReplicasWidgetData = (
	dotMetricsEnabled: boolean,
): Widgets =>
	getWidgetQueryBuilder(
		getWidgetQuery({
			queryData: [
				{
					aggregateAttribute: {
						dataType: DataTypes.Float64,
						key: dotMetricsEnabled
							? 'kafka.partition.replicas_in_sync'
							: 'kafka_partition_replicas_in_sync',
						id: `${
							dotMetricsEnabled
								? 'kafka.partition.replicas_in_sync'
								: 'kafka_partition_replicas_in_sync'
						}--float64--Gauge--true`,
						type: 'Gauge',
					},
					aggregateOperator: 'avg',
					dataSource: DataSource.METRICS,
					disabled: false,
					expression: 'A',
					filters: { items: [], op: 'AND' },
					functions: [],
					groupBy: [
						{
							dataType: DataTypes.String,
							id: 'topic--string--tag--false',
							key: 'topic',
							type: 'tag',
						},
						{
							dataType: DataTypes.String,
							id: 'partition--string--tag--false',
							key: 'partition',
							type: 'tag',
						},
					],
					having: [],
					legend: '',
					limit: null,
					orderBy: [],
					queryName: 'A',
					reduceTo: ReduceOperators.AVG,
					spaceAggregation: 'avg',
					stepInterval: 60,
					timeAggregation: 'avg',
				},
			],
			title: i18n.t('metric_page.insync_replicas', 'In-Sync Replicas (ISR)', {
				ns: 'messagingQueues',
			}),
			description: i18n.t(
				'metric_page.insync_replicas_desc',
				'Count of in-sync replicas for each partition to ensure data availability.',
				{ ns: 'messagingQueues' },
			),
		}),
	);
