import { useTranslation } from 'react-i18next';
import { Badge } from '@signozhq/ui/badge';

export default function BetaTag(): JSX.Element {
	const { t } = useTranslation('common');

	return <Badge color="robin">{t('beta')}</Badge>;
}
