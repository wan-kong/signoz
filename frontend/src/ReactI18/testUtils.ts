import { createInstance, i18n, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nInitOptions, supportedLngs } from './config';

type CreateTestI18nOptions = {
	language?: string;
	resources?: Resource;
};

export function createTestI18nInstance({
	language = 'cimode',
	resources = {},
}: CreateTestI18nOptions = {}): i18n {
	const instance = createInstance();

	void instance.use(initReactI18next).init({
		...i18nInitOptions,
		lng: language,
		fallbackLng: 'en',
		supportedLngs: [...supportedLngs, 'cimode'],
		appendNamespaceToCIMode: true,
		nonExplicitSupportedLngs: false,
		resources,
		initImmediate: false,
		detection: undefined,
		backend: undefined,
		react: {
			useSuspense: false,
		},
	});

	return instance;
}
