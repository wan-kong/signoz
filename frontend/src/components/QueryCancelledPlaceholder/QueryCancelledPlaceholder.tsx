import { Typography } from '@signozhq/ui/typography';
import eyesEmojiUrl from 'assets/Images/eyesEmoji.svg';
import { useTranslation } from 'react-i18next';

import styles from './QueryCancelledPlaceholder.module.scss';

interface QueryCancelledPlaceholderProps {
	subText?: string;
}

function QueryCancelledPlaceholder({
	subText,
}: QueryCancelledPlaceholderProps): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className={styles.placeholder}>
			<img className={styles.emoji} src={eyesEmojiUrl} alt="eyes emoji" />
			<Typography className={styles.text}>
				{t('query_cancelled')}
				<span className={styles.subText}>
					{' '}
					{subText || t('query_cancelled_load_data')}
				</span>
			</Typography>
		</div>
	);
}

QueryCancelledPlaceholder.defaultProps = {
	subText: undefined,
};

export default QueryCancelledPlaceholder;
