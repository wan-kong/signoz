import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

function LogsIndexToFields(): JSX.Element {
	const { t } = useTranslation('common');
	return <Typography>{t('logs_index.title')}</Typography>;
}

export default LogsIndexToFields;
