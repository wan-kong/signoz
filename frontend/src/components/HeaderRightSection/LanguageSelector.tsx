import { useTranslation } from 'react-i18next';
import { Languages } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { DropdownMenuSimple, type MenuItem } from '@signozhq/ui/dropdown-menu';
import logEvent from 'api/common/logEvent';
import {
	normalizeDetectedLanguage,
	selectableLanguages,
} from '../../ReactI18/config';

function LanguageSelector(): JSX.Element | null {
	const { i18n, t } = useTranslation('common');

	const currentLanguage = normalizeDetectedLanguage(
		i18n.resolvedLanguage ?? i18n.language,
	);

	if (selectableLanguages.length <= 1) {
		return null;
	}

	const handleLanguageChange = (language: string): void => {
		if (language === currentLanguage) {
			return;
		}

		void i18n.changeLanguage(language);
		void logEvent('Language: Changed', {
			language,
		});
	};

	const languageItems: MenuItem[] = [
		{
			type: 'radio-group',
			value: currentLanguage,
			onChange: handleLanguageChange,
			children: selectableLanguages.map(({ code, label }) => ({
				type: 'radio',
				key: code,
				value: code,
				label,
			})),
		},
	];

	return (
		<DropdownMenuSimple menu={{ items: languageItems }} align="end">
			<Button variant="ghost" size="icon" aria-label={t('select_language')}>
				<Languages size={14} />
			</Button>
		</DropdownMenuSimple>
	);
}

export default LanguageSelector;
