import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { checkI18n } from './check-i18n.mjs';

async function writeJson(filePath, value) {
	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(`${filePath}`, `${JSON.stringify(value, null, 2)}\n`);
}

async function createFixture() {
	const rootDir = await fs.mkdtemp(path.join(os.tmpdir(), 'signoz-i18n-'));
	await writeJson(path.join(rootDir, 'src/ReactI18/i18n.config.json'), {
		defaultLanguage: 'en',
		fallbackLanguage: 'en',
		queryStringKey: 'lng',
		storageKey: 'i18nextLng',
		languages: [
			{ code: 'en', label: 'English', selectable: true },
			{ code: 'zh-CN', label: 'Simplified Chinese', selectable: false },
		],
	});
	await writeJson(path.join(rootDir, 'public/locales/en/common.json'), {
		action: { save: 'Save' },
		state: 'Ready',
	});

	return rootDir;
}

test('passes when only the fallback locale exists', async () => {
	const rootDir = await createFixture();

	const result = await checkI18n({ rootDir });

	assert.deepEqual(result.errors, []);
	assert.deepEqual(result.checkedLocales, []);
});

test('passes when a target locale matches fallback namespaces and keys', async () => {
	const rootDir = await createFixture();
	await writeJson(path.join(rootDir, 'public/locales/zh-CN/common.json'), {
		action: { save: '保存' },
		state: '就绪',
	});

	const result = await checkI18n({ rootDir });

	assert.deepEqual(result.errors, []);
	assert.deepEqual(result.checkedLocales, ['zh-CN']);
});

test('reports missing and extra keys in configured target locales', async () => {
	const rootDir = await createFixture();
	await writeJson(path.join(rootDir, 'public/locales/zh-CN/common.json'), {
		action: {},
		extra: 'Extra',
	});

	const result = await checkI18n({ rootDir });

	assert.deepEqual(result.errors, [
		'zh-CN/common: missing key "action.save"',
		'zh-CN/common: missing key "state"',
		'zh-CN/common: extra key "extra"',
	]);
});
