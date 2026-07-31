import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import noDataUrl from '@/assets/Icons/no-data.svg';

import styles from './NoData.module.scss';

interface INoDataProps {
	name: string;
}

function NoData(props: INoDataProps): JSX.Element {
	const { name } = props;
	const { t } = useTranslation('trace');

	return (
		<div className={styles.noData}>
			<img src={noDataUrl} alt="no-data" className={styles.noDataImg} />
			<Typography.Text className={styles.noDataText}>
				{t('trace_details.events.no_data_for_span', { name })}
			</Typography.Text>
		</div>
	);
}

export default NoData;
