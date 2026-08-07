import { useTranslation } from 'react-i18next';

function Header(): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className="traces-funnels-header">
			<div className="traces-funnels-header-title">
				{t('trace:tabs.funnels', 'Funnels')}
			</div>
			<div className="traces-funnels-header-subtitle">
				{t('trace:funnels.header_subtitle', 'Create and manage tracing funnels.')}
			</div>
		</div>
	);
}

export default Header;
