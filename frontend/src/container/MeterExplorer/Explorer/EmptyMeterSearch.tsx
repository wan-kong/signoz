import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import { Typography } from '@signozhq/ui/typography';

import styles from './EmptyMeterSearch.module.scss';

interface EmptyMeterSearchProps {
	hasQueryResult?: boolean;
}

export default function EmptyMeterSearch({
	hasQueryResult,
}: EmptyMeterSearchProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className={styles.emptyMeterSearch}>
			<Empty
				description={
					<Typography.Title level={5}>
						{hasQueryResult
							? t('no_data', { ns: 'common' })
							: t('select_metric_and_run', { ns: 'common' })}
					</Typography.Title>
				}
			/>
		</div>
	);
}
