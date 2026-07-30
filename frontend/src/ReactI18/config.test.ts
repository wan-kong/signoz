import {
	getI18nLoadPath,
	i18nInitOptions,
	normalizeDetectedLanguage,
	selectableLanguages,
	supportedLanguageDetector,
	supportedLngs,
} from './config';

describe('i18n config', () => {
	beforeEach(() => {
		window.history.pushState({}, '', '/');
		window.localStorage.clear();
		document.documentElement.lang = '';
		Object.defineProperty(window.navigator, 'languages', {
			configurable: true,
			value: [],
		});
	});

	it('declares the initial runtime language contract', () => {
		expect(i18nInitOptions.fallbackLng).toBe('en');
		expect(i18nInitOptions.supportedLngs).toStrictEqual(['en', 'zh-CN']);
		expect(i18nInitOptions.nonExplicitSupportedLngs).toBe(false);
		expect(i18nInitOptions.load).toBe('currentOnly');
		expect(i18nInitOptions.detection).toStrictEqual(
			expect.objectContaining({
				order: ['supportedLanguage'],
				caches: ['localStorage'],
				lookupQuerystring: 'lng',
				lookupLocalStorage: 'i18nextLng',
			}),
		);
		expect(supportedLngs).toStrictEqual(['en', 'zh-CN']);
		expect(selectableLanguages.map(({ code }) => code)).toStrictEqual([
			'en',
			'zh-CN',
		]);
	});

	it.each([
		['en', 'en'],
		['en-US', 'en'],
		['en_GB', 'en'],
		['zh', 'zh-CN'],
		['zh-CN', 'zh-CN'],
		['zh-Hans', 'zh-CN'],
		['zh-Hans-CN', 'zh-CN'],
		['zh-TW', 'en'],
		['zh-HK', 'en'],
		['fr', 'en'],
		[undefined, 'en'],
	])('normalizes %s to %s', (input, expected) => {
		expect(normalizeDetectedLanguage(input)).toBe(expected);
	});

	it('detects languages from query string before persisted and browser values', () => {
		window.history.pushState({}, '', '?lng=zh-CN');
		window.localStorage.setItem('i18nextLng', 'en');

		expect(supportedLanguageDetector.lookup({})).toBe('zh-CN');
	});

	it('skips unsupported persisted values and falls through to browser values', () => {
		window.history.pushState({}, '', '?lng=fr');
		window.localStorage.setItem('i18nextLng', 'zh-TW');
		Object.defineProperty(window.navigator, 'languages', {
			configurable: true,
			value: ['zh-Hans'],
		});

		expect(supportedLanguageDetector.lookup({})).toBe('zh-CN');
	});

	it('caches the normalized language in the existing i18next localStorage key', () => {
		supportedLanguageDetector.cacheUserLanguage?.('zh-Hans', {});

		expect(window.localStorage.getItem('i18nextLng')).toBe('zh-CN');
	});

	it('builds locale resource URLs from normalized language and namespace', () => {
		expect(getI18nLoadPath(['en-US'], ['common'])).toMatch(
			/^\/locales\/en\/common\.json\?h=[a-f0-9]+$/,
		);
		expect(getI18nLoadPath(['zh-TW'], ['common'])).toMatch(
			/^\/locales\/en\/common\.json\?h=[a-f0-9]+$/,
		);
	});
});
