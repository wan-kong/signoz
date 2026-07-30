import { ReactNode, useEffect, useMemo } from 'react';
import { ConfigProvider, ThemeConfig } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import { useTranslation } from 'react-i18next';

import { normalizeDetectedLanguage } from '../../ReactI18/config';

type LocaleProviderProps = {
	children: ReactNode;
	theme: ThemeConfig;
};

const antdLocales = {
	en: enUS,
	'zh-CN': zhCN,
};

const dayjsLocales = {
	en: 'en',
	'zh-CN': 'zh-cn',
};

type SupportedLocale = keyof typeof antdLocales;

export function LocaleProvider({
	children,
	theme,
}: LocaleProviderProps): JSX.Element {
	const { i18n } = useTranslation();
	const locale = normalizeDetectedLanguage(
		i18n.resolvedLanguage ?? i18n.language,
	) as SupportedLocale;
	const antdLocale = useMemo(() => antdLocales[locale], [locale]);

	useEffect(() => {
		dayjs.locale(dayjsLocales[locale]);
		document.documentElement.lang = locale;
	}, [locale]);

	return (
		<ConfigProvider locale={antdLocale} theme={theme}>
			{children}
		</ConfigProvider>
	);
}
