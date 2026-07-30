import { useTranslation } from 'react-i18next';
import NotFoundImage from 'assets/NotFound';
import ROUTES from 'constants/routes';

import { defaultText } from './constant';
import { Button, Container, Text, TextContainer } from './styles';

function NotFound({ text = defaultText }: Props): JSX.Element {
	const { t } = useTranslation('common');
	const resolvedText = text === defaultText ? t('not_found_default_text') : text;

	return (
		<Container>
			<NotFoundImage />

			<TextContainer>
				<Text>{resolvedText}</Text>
				<Text>{t('page_not_found')}</Text>
			</TextContainer>

			<Button to={ROUTES.HOME} tabIndex={0}>
				{t('return_home')}
			</Button>
		</Container>
	);
}

interface Props {
	text?: string;
}

NotFound.defaultProps = {
	text: defaultText,
};

export default NotFound;
