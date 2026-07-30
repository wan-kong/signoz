import type { InitOptions } from 'i18next';
import type { CustomDetector } from 'i18next-browser-languagedetector';
import { getBasePath } from 'utils/basePath';

import cacheBursting from '../../i18n-translations-hash.json';
import i18nConfig from './i18n.config.json';

type LanguageConfig = {
	code: string;
	label: string;
	selectable: boolean;
	aliases?: string[];
};

type I18nConfig = {
	defaultLanguage: string;
	fallbackLanguage: string;
	queryStringKey: string;
	storageKey: string;
	languages: LanguageConfig[];
};

const config = i18nConfig as I18nConfig;

export const supportedLanguages = config.languages;
export const supportedLngs = supportedLanguages.map(({ code }) => code);
export const selectableLanguages = supportedLanguages.filter(
	({ selectable }) => selectable,
);

const fallbackLanguage = config.fallbackLanguage;
const supportedLanguageByLowercaseCode = new Map(
	supportedLanguages.map((language) => [
		language.code.toLowerCase(),
		language.code,
	]),
);
const supportedLanguageByLowercaseAlias = new Map(
	supportedLanguages.flatMap((language) =>
		(language.aliases ?? []).map((alias) => [alias.toLowerCase(), language.code]),
	),
);

function sanitizeLanguage(language: string): string {
	return language.split(',')[0].split(';')[0].trim().replace(/_/g, '-');
}

function getMatchedLanguage(language: string): string | undefined {
	const normalizedLanguage = sanitizeLanguage(language).toLowerCase();

	if (!normalizedLanguage) {
		return undefined;
	}

	const exactMatch =
		supportedLanguageByLowercaseCode.get(normalizedLanguage) ??
		supportedLanguageByLowercaseAlias.get(normalizedLanguage);

	if (exactMatch) {
		return exactMatch;
	}

	const languagePart = normalizedLanguage.split('-')[0];
	const languagePartMatch = supportedLanguageByLowercaseCode.get(languagePart);

	if (languagePartMatch) {
		return languagePartMatch;
	}

	return undefined;
}

export function normalizeDetectedLanguage(language?: string | null): string {
	if (!language) {
		return fallbackLanguage;
	}

	return getMatchedLanguage(language) ?? fallbackLanguage;
}

function getDetectedLanguageCandidates(): string[] {
	if (typeof window === 'undefined') {
		return [];
	}

	const candidates = [
		new URLSearchParams(window.location.search).get(config.queryStringKey),
		window.localStorage.getItem(config.storageKey),
		...Array.from(window.navigator.languages ?? []),
		window.navigator.language,
		document.documentElement.lang,
	];

	return candidates.filter((candidate): candidate is string =>
		Boolean(candidate),
	);
}

export const supportedLanguageDetector: CustomDetector = {
	name: 'supportedLanguage',
	lookup: (): string => {
		const matchedLanguage = getDetectedLanguageCandidates()
			.map(getMatchedLanguage)
			.find((language): language is string => Boolean(language));

		return matchedLanguage ?? fallbackLanguage;
	},
	cacheUserLanguage: (language): void => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(
			config.storageKey,
			normalizeDetectedLanguage(language),
		);
	},
};

export function getI18nLoadPath(
	languages: string[],
	namespaces: string[],
): string {
	const language = normalizeDetectedLanguage(languages[0]);
	const namespace = namespaces[0];
	const pathkey = `/${language}/${namespace}`;
	const hash = cacheBursting[pathkey as keyof typeof cacheBursting] || '';

	return `${getBasePath()}locales/${language}/${namespace}.json?h=${hash}`;
}

export const i18nInitOptions: InitOptions = {
	debug: false,
	fallbackLng: fallbackLanguage,
	supportedLngs,
	nonExplicitSupportedLngs: false,
	load: 'currentOnly',
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: [supportedLanguageDetector.name],
		caches: ['localStorage'],
		lookupQuerystring: config.queryStringKey,
		lookupLocalStorage: config.storageKey,
	},
	backend: {
		loadPath: getI18nLoadPath,
	},
	react: {
		useSuspense: false,
	},
};
