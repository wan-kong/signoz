import { createTestI18nInstance } from './testUtils';

describe('createTestI18nInstance', () => {
	it('keeps legacy tests returning keys by default', () => {
		const i18n = createTestI18nInstance();

		expect(i18n.t('common:save')).toBe('common:save');
	});

	it('can use real resources when a test opts in to a language', () => {
		const i18n = createTestI18nInstance({
			language: 'zh-CN',
			resources: {
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
		});

		expect(i18n.t('common:save')).toBe('保存');
	});
});
