import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ResizeTable } from 'components/ResizeTable';
import { useTranslation } from 'react-i18next';

import { COLUMN_TITLE_KEYS, ColumnKey } from './Columns/ColumnContants';
import { getColumns } from './Columns/ServiceColumn';
import { Container } from './styles';
import ServiceTableProp from './types';

function Services({ services, isLoading }: ServiceTableProp): JSX.Element {
	const { search } = useLocation();
	const { t } = useTranslation('services');

	const tableColumns = useMemo(
		() =>
			getColumns(search, {
				[ColumnKey.Application]: t(COLUMN_TITLE_KEYS[ColumnKey.Application]),
				[ColumnKey.P99]: t(COLUMN_TITLE_KEYS[ColumnKey.P99]),
				[ColumnKey.ErrorRate]: t(COLUMN_TITLE_KEYS[ColumnKey.ErrorRate]),
				[ColumnKey.Operations]: t(COLUMN_TITLE_KEYS[ColumnKey.Operations]),
			}),
		[search, t],
	);

	return (
		<Container>
			<ResizeTable
				columns={tableColumns}
				dataSource={services}
				loading={isLoading}
				rowKey="serviceName"
			/>
		</Container>
	);
}

export default Services;
