import { Group } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

import { translateInfraKey, translateInfraText } from '../i18n';
import styles from './EntityGroupHeader.module.scss';

interface EntityGroupHeaderProps {
	title: string;
	titleKey?: string;
	icon?: React.ReactNode;
}

function EntityGroupHeader({
	title,
	titleKey,
	icon,
}: EntityGroupHeaderProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className={styles.entityGroupHeader}>
			{icon || <Group size={14} data-hide-expanded="true" />}{' '}
			{titleKey
				? translateInfraKey(t, titleKey, title)
				: translateInfraText(t, title)}
		</div>
	);
}

export default EntityGroupHeader;
