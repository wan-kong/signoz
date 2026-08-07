import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { type TabItemProps } from '@signozhq/ui/tabs';
import ROUTES from 'constants/routes';
import { useSafeNavigate } from 'hooks/useSafeNavigate';

import LLMObservabilityAttributeMapping from '../AttributeMapping/LLMObservabilityAttributeMapping';
import Overview from '../Overview/Overview';
import LLMObservabilityModelPricing from '../Settings/ModelPricing/LLMObservabilityModelPricing';

const OVERVIEW_KEY = ROUTES.AI_OBSERVABILITY_OVERVIEW;
const CONFIGURATION_KEY = ROUTES.AI_OBSERVABILITY_CONFIGURATION;
const ATTRIBUTE_MAPPING_KEY = ROUTES.AI_OBSERVABILITY_ATTRIBUTE_MAPPING;

interface UseLLMObservabilityTabsResult {
	items: TabItemProps[];
	activeTab: string;
	onTabChange: (key: string) => void;
}

// Drives the top-level LLM Observability tabs. Route-driven: the active tab is
// derived from the pathname (each tab owns a URL) and changing tabs navigates,
// so tabs stay shareable/back-button friendly while rendering with the SigNoz
// design-system Tabs.
export function useLLMObservabilityTabs(): UseLLMObservabilityTabsResult {
	const { t } = useTranslation('llm_unpriced');
	const { pathname } = useLocation();
	const { safeNavigate } = useSafeNavigate();

	let activeTab: string = OVERVIEW_KEY;
	if (pathname.startsWith(CONFIGURATION_KEY)) {
		activeTab = CONFIGURATION_KEY;
	} else if (pathname.startsWith(ATTRIBUTE_MAPPING_KEY)) {
		activeTab = ATTRIBUTE_MAPPING_KEY;
	}

	const onTabChange = useCallback(
		(key: string): void => {
			safeNavigate(key);
		},
		[safeNavigate],
	);

	const items: TabItemProps[] = [
		{
			key: OVERVIEW_KEY,
			label: t('tabs.overview', 'Overview'),
			children: <Overview />,
		},
		{
			key: CONFIGURATION_KEY,
			label: t('tabs.model_pricing', 'Model pricing'),
			children: <LLMObservabilityModelPricing />,
		},
		{
			key: ATTRIBUTE_MAPPING_KEY,
			label: t('tabs.attribute_mapping', 'Attribute Mapping'),
			children: <LLMObservabilityAttributeMapping />,
		},
	];

	return { items, activeTab, onTabChange };
}
