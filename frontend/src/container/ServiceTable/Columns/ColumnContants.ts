export enum ColumnKey {
	Application = 'serviceName',
	P99 = 'p99',
	ErrorRate = 'errorRate',
	Operations = 'callRate',
}

export const COLUMN_TITLE_KEYS: Record<ColumnKey, string> = {
	[ColumnKey.Application]: 'table.columns.application',
	[ColumnKey.P99]: 'table.columns.p99_latency_in_ms',
	[ColumnKey.ErrorRate]: 'table.columns.error_rate',
	[ColumnKey.Operations]: 'table.columns.operations_per_second',
};

export enum ColumnWidth {
	Application = 200,
	P99 = 150,
	ErrorRate = 150,
	Operations = 150,
}

export const SORTING_ORDER = 'descend';
