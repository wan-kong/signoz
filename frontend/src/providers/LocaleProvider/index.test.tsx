import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { render, screen } from 'tests/test-utils';

import { LocaleProvider } from '.';

function LocaleProbe(): JSX.Element {
	const { t } = useTranslation('common');

	return <span>{t('save')}</span>;
}

describe('LocaleProvider', () => {
	it('syncs document and dayjs locale for zh-CN', () => {
		render(
			<LocaleProvider theme={{}}>
				<LocaleProbe />
			</LocaleProvider>,
			undefined,
			{
				i18nLanguage: 'zh-CN',
				i18nResources: {
					en: {
						common: {
							save: 'Save',
						},
					},
					'zh-CN': {
						common: {
							save: '保存',
						},
					},
				},
			},
		);

		expect(screen.getByText('保存')).toBeInTheDocument();
		expect(document.documentElement.lang).toBe('zh-CN');
		expect(dayjs.locale()).toBe('zh-cn');
	});
});
