import { Color } from '@signozhq/design-tokens';
import { Button } from 'antd';
import { ArrowUpRight } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { openInNewTab } from 'utils/navigation';

import './LearnMore.styles.scss';

type LearnMoreProps = {
	text?: string;
	url?: string;
	onClick?: () => void;
};

function LearnMore({ text, url, onClick }: LearnMoreProps): JSX.Element {
	const { t } = useTranslation('common');
	const handleClick = (): void => {
		onClick?.();
		if (url) {
			openInNewTab(url);
		}
	};
	return (
		<Button type="link" className="learn-more" onClick={handleClick}>
			<div className="learn-more__text">{text || t('learn_more')}</div>
			<ArrowUpRight size={16} color={Color.BG_ROBIN_400} />
		</Button>
	);
}

LearnMore.defaultProps = {
	text: '',
	url: '',
	onClick: (): void => {},
};

export default LearnMore;
