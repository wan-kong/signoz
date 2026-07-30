import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRootDir = path.resolve(scriptDir, '..');

function isRecord(value) {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

async function readJson(filePath) {
	const content = await fs.readFile(filePath, 'utf8');
	return JSON.parse(content);
}

function flattenKeys(value, prefix = '') {
	if (!isRecord(value)) {
		return prefix ? [prefix] : [];
	}

	return Object.keys(value).flatMap((key) => {
		const nextPrefix = prefix ? `${prefix}.${key}` : key;
		return isRecord(value[key])
			? flattenKeys(value[key], nextPrefix)
			: [nextPrefix];
	});
}

async function pathExists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

function getDifference(left, right) {
	return [...left]
		.filter((key) => !right.has(key))
		.sort((leftKey, rightKey) => leftKey.localeCompare(rightKey));
}

function validateConfig(config) {
	const errors = [];
	const languages = config.languages ?? [];
	const codes = new Set(languages.map(({ code }) => code));

	if (!codes.has(config.defaultLanguage)) {
		errors.push(`defaultLanguage "${config.defaultLanguage}" is not configured`);
	}

	if (!codes.has(config.fallbackLanguage)) {
		errors.push(
			`fallbackLanguage "${config.fallbackLanguage}" is not configured`,
		);
	}

	if (codes.size !== languages.length) {
		errors.push('language codes must be unique');
	}

	return errors;
}

function isSelectableLocale(config, locale) {
	return Boolean(
		config.languages.find(
			(language) => language.code === locale && language.selectable,
		),
	);
}

async function readLocaleNamespaces(localeDir) {
	const entries = await fs.readdir(localeDir, { withFileTypes: true });
	const namespaces = new Map();

	for (const entry of entries) {
		if (!entry.isFile() || !entry.name.endsWith('.json')) {
			continue;
		}

		const namespace = path.basename(entry.name, '.json');
		const filePath = path.join(localeDir, entry.name);
		namespaces.set(namespace, new Set(flattenKeys(await readJson(filePath))));
	}

	return namespaces;
}

function compareLocaleNamespaces(
	locale,
	sourceNamespaces,
	targetNamespaces,
	options = {},
) {
	const errors = [];
	const missingNamespaces = options.allowPartialNamespaces
		? []
		: getDifference(sourceNamespaces.keys(), targetNamespaces);
	const extraNamespaces = getDifference(
		targetNamespaces.keys(),
		sourceNamespaces,
	);

	for (const namespace of missingNamespaces) {
		errors.push(`${locale}: missing namespace "${namespace}"`);
	}

	for (const namespace of extraNamespaces) {
		errors.push(`${locale}: extra namespace "${namespace}"`);
	}

	return errors.concat(
		compareLocaleKeys(locale, sourceNamespaces, targetNamespaces),
	);
}

function compareLocaleKeys(locale, sourceNamespaces, targetNamespaces) {
	const errors = [];

	for (const [namespace, sourceKeys] of sourceNamespaces) {
		const targetKeys = targetNamespaces.get(namespace);

		if (!targetKeys) {
			continue;
		}

		for (const key of getDifference(sourceKeys, targetKeys)) {
			errors.push(`${locale}/${namespace}: missing key "${key}"`);
		}

		for (const key of getDifference(targetKeys, sourceKeys)) {
			errors.push(`${locale}/${namespace}: extra key "${key}"`);
		}
	}

	return errors;
}

export async function checkI18n(options = {}) {
	const rootDir = options.rootDir ?? defaultRootDir;
	const configPath = path.join(rootDir, 'src/ReactI18/i18n.config.json');
	const localesDir = path.join(rootDir, 'public/locales');
	const config = await readJson(configPath);
	const errors = validateConfig(config);
	const warnings = [];
	const supportedCodes = new Set(config.languages.map(({ code }) => code));
	const sourceDir = path.join(localesDir, config.fallbackLanguage);

	if (!(await pathExists(sourceDir))) {
		errors.push(`fallback locale directory missing: ${sourceDir}`);
		return { errors, warnings, checkedLocales: [] };
	}

	const sourceNamespaces = await readLocaleNamespaces(sourceDir);
	const entries = await fs.readdir(localesDir, { withFileTypes: true });
	const checkedLocales = [];

	for (const entry of entries) {
		if (!entry.isDirectory() || entry.name === config.fallbackLanguage) {
			continue;
		}

		if (!supportedCodes.has(entry.name)) {
			warnings.push(`${entry.name}: locale directory is not in i18n.config.json`);
			continue;
		}

		const namespaces = await readLocaleNamespaces(
			path.join(localesDir, entry.name),
		);
		checkedLocales.push(entry.name);
		errors.push(
			...compareLocaleNamespaces(entry.name, sourceNamespaces, namespaces, {
				allowPartialNamespaces: !isSelectableLocale(config, entry.name),
			}),
		);
	}

	return { errors, warnings, checkedLocales };
}

async function main() {
	const { errors, warnings, checkedLocales } = await checkI18n();

	for (const warning of warnings) {
		console.warn(`i18n warning: ${warning}`);
	}

	if (errors.length > 0) {
		console.error(`i18n check failed with ${errors.length} issue(s):`);
		for (const error of errors) {
			console.error(`- ${error}`);
		}
		process.exitCode = 1;
		return;
	}

	process.stdout.write(
		`i18n check passed. Checked ${checkedLocales.length} target locale(s).`,
	);
	process.stdout.write('\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
	await main();
}
