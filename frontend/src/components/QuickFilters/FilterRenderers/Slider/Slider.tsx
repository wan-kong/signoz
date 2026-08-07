import { useTranslation } from 'react-i18next';
import './Slider.styles.scss';

export default function Slider(): JSX.Element {
	const { t } = useTranslation('quick_filters');

	return <div>{t('slider_filter.placeholder', 'Slider')}</div>;
}
