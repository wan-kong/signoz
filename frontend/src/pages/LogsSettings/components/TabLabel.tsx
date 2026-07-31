import { useLocation } from 'react-router-dom';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import { TableLabel } from '../types';

function TabLabel({ routeKey, label }: TableLabel): JSX.Element {
	const { pathname } = useLocation();
	const { t } = useTranslation('routes');
	const translatedLabel = t(label);

	if (pathname === routeKey) {
		return <Typography.Link>{translatedLabel}</Typography.Link>;
	}

	return <Typography>{translatedLabel}</Typography>;
}

export default TabLabel;
