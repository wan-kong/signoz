import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './VolumeControlToolbar.module.scss';

interface VolumeControlToolbarProps {
	value: string;
	onChange: (value: string) => void;
}

function VolumeControlToolbar({
	value,
	onChange,
}: VolumeControlToolbarProps): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<div className={styles.toolbar}>
			<Input
				className={styles.search}
				placeholder={t('metrics_explorer.search_metrics')}
				allowClear
				value={value}
				onChange={(e): void => onChange(e.target.value)}
				data-testid="volume-control-search"
			/>
		</div>
	);
}

export default VolumeControlToolbar;
