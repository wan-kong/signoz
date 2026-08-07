import { initReactI18next } from 'react-i18next';
import i18nInstance, {
	init as initI18n,
	use as registerI18nPlugin,
} from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import { i18nInitOptions, supportedLanguageDetector } from './config';

const languageDetector = new LanguageDetector();
languageDetector.addDetector(supportedLanguageDetector);

// load translation using http -> see /public/locales
registerI18nPlugin(Backend);
// detect user language
registerI18nPlugin(languageDetector);
// pass the i18n instance to react-i18next.
registerI18nPlugin(initReactI18next);
// Pass a copy: i18next.init mutates the options object (fallbackLng -> array, adds 'cimode' to supportedLngs), which would corrupt the shared exported i18nInitOptions.
void initI18n({ ...i18nInitOptions });

export default i18nInstance;
