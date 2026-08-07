import { useTranslation } from 'react-i18next';
import { EQueryType } from 'types/common/dashboard';

function QueryTypeTag({ queryType }: IQueryTypeTagProps): JSX.Element {
	const { t } = useTranslation('new_widget');
	switch (queryType) {
		case EQueryType.QUERY_BUILDER:
			return (
				<span>{t('left.query_type_tag.query_builder', 'Query Builder')}</span>
			);

		case EQueryType.CLICKHOUSE:
			return (
				<span>{t('left.query_type_tag.clickhouse_query', 'ClickHouse Query')}</span>
			);
		case EQueryType.PROM:
			return <span>{t('left.query_type_tag.promql', 'PromQL')}</span>;
		default:
			return <span />;
	}
}

interface IQueryTypeTagProps {
	queryType?: EQueryType;
}

QueryTypeTag.defaultProps = {
	queryType: EQueryType.QUERY_BUILDER,
};

export default QueryTypeTag;
