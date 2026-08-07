import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';

import { Container } from './styles';

function EmptyWidget(): JSX.Element {
	const { t } = useTranslation('dashboard');
	return (
		<Container>
			<Typography.Text>
				{t(
					'dashboard_empty_state.empty_widget_click_to_add',
					'Click one of the widget types above (Time Series / Value) to add here',
				)}
			</Typography.Text>
		</Container>
	);
}

export default EmptyWidget;
