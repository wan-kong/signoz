import { Group } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

import styles from './EntityGroupHeader.module.scss';

interface EntityGroupHeaderProps {
	title: string;
	icon?: React.ReactNode;
}

function EntityGroupHeader({
	title,
	icon,
}: EntityGroupHeaderProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.entityGroupHeader}>
			{icon || <Group size={14} data-hide-expanded="true" />}{' '}
			{t(title || '', { defaultValue: title })}
		</div>
	);
}

export default EntityGroupHeader;
