import i18n from 'ReactI18';
import { RowData } from 'lib/query/createTableColumnsFromQuery';

export function createDownloadableData(
	inputData: RowData[],
): Record<string, string>[] {
	return inputData.map((row) => ({
		[i18n.t('table_utils.name', 'Name', { ns: 'query_table' })]: String(
			row.operation || '',
		),
		[i18n.t('table_utils.p50_in_ns', 'P50 (in ns)', { ns: 'query_table' })]:
			String(row.A || ''),
		[i18n.t('table_utils.p90_in_ns', 'P90 (in ns)', { ns: 'query_table' })]:
			String(row.B || ''),
		[i18n.t('table_utils.p99_in_ns', 'P99 (in ns)', { ns: 'query_table' })]:
			String(row.C || ''),
		[i18n.t('table_utils.number_of_calls', 'Number Of Calls', {
			ns: 'query_table',
		})]: String(row.F || ''),
		[i18n.t('table_utils.error_rate', 'Error Rate (%)', {
			ns: 'query_table',
		})]: String(row.F1 && row.F1 !== 'N/A' ? row.F1 : '0'),
	}));
}
