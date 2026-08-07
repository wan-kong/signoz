import i18n from 'ReactI18';
import { LlmpricingruletypesLLMPricingRuleCacheModeDTO as CacheModeDTO } from 'api/generated/services/sigNoz.schemas';

import type { CacheBucketDef, DrawerDraft } from './types';

export const PAGE_SIZE = 20;

export const TOAST_MODEL_COST_ADDED = i18n.t(
	'constants.toast_model_cost_added',
	'Model cost added',
	{ ns: 'llm_unpriced' },
);
export const TOAST_MODEL_COST_UPDATED = i18n.t(
	'constants.toast_model_cost_updated',
	'Model cost updated',
	{ ns: 'llm_unpriced' },
);
export const TOAST_MODEL_COST_DELETED = i18n.t(
	'constants.toast_model_cost_deleted',
	'Model cost deleted',
	{ ns: 'llm_unpriced' },
);

export const PAGE_KEY = 'page';
export const LIMIT_KEY = 'limit';
export const SEARCH_KEY = 'search';
export const SEARCH_DEBOUNCE_MS = 300;
export const SOURCE_KEY = 'source';

export type SourceFilter = 'all' | 'override' | 'auto';
export const SOURCE_FILTER_OPTIONS: { value: SourceFilter; label: string }[] = [
	{
		value: 'all',
		label: i18n.t('constants.source_all', 'All sources', { ns: 'llm_unpriced' }),
	},
	{
		value: 'override',
		label: i18n.t('constants.source_user_override', 'User override', {
			ns: 'llm_unpriced',
		}),
	},
	{
		value: 'auto',
		label: i18n.t('constants.source_auto', 'Auto', { ns: 'llm_unpriced' }),
	},
];

export const SOURCE_FILTER_TO_IS_OVERRIDE: Record<
	SourceFilter,
	boolean | undefined
> = {
	all: undefined,
	override: true,
	auto: false,
};

// Match the page size so the skeleton reserves the same number of rows the
// loaded page renders — otherwise the table height jumps on load.
export const SKELETON_ROW_COUNT = PAGE_SIZE;

export const RULE_OPTIONS_LIMIT = 10;

// URL-backed key for the active tab on the model-pricing page.
export const TAB_KEY = 'tab';
export const MODEL_COSTS_TAB = 'model-costs';
export const UNPRICED_MODELS_TAB = 'unpriced-models';

export const PROVIDER_OPTIONS = [
	{ value: 'OpenAI', label: 'OpenAI' },
	{ value: 'Anthropic', label: 'Anthropic' },
	{ value: 'Azure OpenAI', label: 'Azure OpenAI' },
	{ value: 'Google', label: 'Google' },
	{
		value: 'Self-hosted',
		label: i18n.t('constants.provider_self_hosted', 'Self-hosted', {
			ns: 'llm_unpriced',
		}),
	},
	{
		value: 'Other',
		label: i18n.t('constants.provider_other', 'Other', { ns: 'llm_unpriced' }),
	},
];

export const CACHE_MODE_OPTIONS = [
	{
		value: CacheModeDTO.subtract,
		label: i18n.t('constants.cache_mode_subtract', 'Subtract (OpenAI style)', {
			ns: 'llm_unpriced',
		}),
	},
	{
		value: CacheModeDTO.additive,
		label: i18n.t('constants.cache_mode_additive', 'Additive (Anthropic style)', {
			ns: 'llm_unpriced',
		}),
	},
	// https://app.notion.com/p/signoz/LLM-Tokens-Cost-Calculation-330fcc6bcd19805283ccc841d596358e?source=copy_link#33efcc6bcd1980e6a187e442c6ba5996
	{
		value: CacheModeDTO.unknown,
		label: i18n.t('constants.cache_mode_unknown', 'Unknown', {
			ns: 'llm_unpriced',
		}),
	},
];

export const CACHE_BUCKETS: CacheBucketDef[] = [
	{ key: 'cacheRead', label: 'cache_read', testId: 'cache-read' },
	{ key: 'cacheWrite', label: 'cache_write', testId: 'cache-write' },
];

export const EMPTY_DRAFT: DrawerDraft = {
	id: null,
	sourceId: null,
	modelName: '',
	provider: 'OpenAI',
	patterns: [],
	isOverride: true,
	enabled: true,
	pricing: {
		input: null,
		output: null,
		cacheMode: CacheModeDTO.unknown,
		cacheRead: null,
		cacheWrite: null,
	},
};
