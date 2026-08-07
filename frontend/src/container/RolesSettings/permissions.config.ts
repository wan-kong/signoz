import i18n from 'ReactI18';
import {
	Bot,
	ChartLine,
	DraftingCompass,
	Gauge,
	Key,
	Logs,
	Shield,
} from '@signozhq/icons';

import permissionsType from 'lib/authz/hooks/useAuthZ/permissions.type';
import {
	AuthZResource,
	AuthZVerb,
	OBJECT_SCOPED_VERBS,
	ObjectScopedVerb,
} from 'lib/authz/hooks/useAuthZ/types';
import { CoretypesTypeDTO } from 'api/generated/services/sigNoz.schemas';

/** Shared shape of the icon components exported by `@signozhq/icons`. */
type IconComponent = typeof Shield;

const OBJECT_SCOPED_VERB_SET = new Set<string>(OBJECT_SCOPED_VERBS);

export type SelectorType = 'input' | 'telemetryBuilder';

export interface ResourcePanelConfig {
	label: string;
	description: string;
	icon: IconComponent;
	selectorPlaceholder: string;
	docsAnchor: string;
	selectorType?: SelectorType;
}

/**
 * Do not use CoretypesTypeDTO to represent this,
 * we want to add resource panel configs for only types we actually are using,
 * not all of them
 */
export const RESOURCE_PANELS: Record<AuthZResource, ResourcePanelConfig> = {
	'factor-api-key': {
		label: i18n.t('permissions.api_keys_label', 'API Keys', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.api_keys_description',
			'Programmatic access tokens for the workspace.',
			{ ns: 'organizationsettings' },
		),
		icon: Key,
		selectorPlaceholder: i18n.t(
			'permissions.api_keys_placeholder',
			'Type API key ID, separate multiple with comma or space',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'factor-api-key',
	},
	role: {
		label: i18n.t('permissions.roles_label', 'Roles', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.roles_description',
			'Custom and managed roles and their assignments.',
			{ ns: 'organizationsettings' },
		),
		icon: Shield,
		selectorPlaceholder: i18n.t(
			'permissions.roles_placeholder',
			'Type role name, separate multiple with comma or space',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'role',
	},
	serviceaccount: {
		label: i18n.t('permissions.service_accounts_label', 'Service Accounts', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.service_accounts_description',
			'Non-human identities used by integrations.',
			{ ns: 'organizationsettings' },
		),
		icon: Bot,
		selectorPlaceholder: i18n.t(
			'permissions.service_accounts_placeholder',
			'Type service account ID, separate multiple with comma or space',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'service-account',
	},
	logs: {
		label: i18n.t('permissions.logs_label', 'Logs', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.logs_description',
			'Log data collected across the workspace.',
			{ ns: 'organizationsettings' },
		),
		icon: Logs,
		selectorPlaceholder: i18n.t(
			'permissions.telemetry_selector_placeholder',
			'Enter selector as <query-type>/<key>/<value> or <query-type>/* or use wizard...',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'logs',
		selectorType: 'telemetryBuilder',
	},
	traces: {
		label: i18n.t('permissions.traces_label', 'Traces', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.traces_description',
			'Distributed tracing data collected across the workspace.',
			{ ns: 'organizationsettings' },
		),
		icon: DraftingCompass,
		selectorPlaceholder: i18n.t(
			'permissions.telemetry_selector_placeholder',
			'Enter selector as <query-type>/<key>/<value> or <query-type>/* or use wizard...',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'traces',
		selectorType: 'telemetryBuilder',
	},
	metrics: {
		label: i18n.t('permissions.metrics_label', 'Metrics', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.metrics_description',
			'Metric data collected across the workspace.',
			{ ns: 'organizationsettings' },
		),
		icon: ChartLine,
		selectorPlaceholder: i18n.t(
			'permissions.telemetry_selector_placeholder',
			'Enter selector as <query-type>/<key>/<value> or <query-type>/* or use wizard...',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'metrics',
		selectorType: 'telemetryBuilder',
	},
	'meter-metrics': {
		label: i18n.t('permissions.meter_metrics_label', 'Meter Metrics', {
			ns: 'organizationsettings',
		}),
		description: i18n.t(
			'permissions.meter_metrics_description',
			'Usage metering data for the workspace.',
			{ ns: 'organizationsettings' },
		),
		icon: Gauge,
		selectorPlaceholder: i18n.t(
			'permissions.telemetry_selector_placeholder',
			'Enter selector as <query-type>/<key>/<value> or <query-type>/* or use wizard...',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: 'meter-metrics',
		selectorType: 'telemetryBuilder',
	},
};

export const RESOURCE_ORDER = Object.keys(RESOURCE_PANELS) as AuthZResource[];

export function getResourcePanel(resource: AuthZResource): ResourcePanelConfig {
	const panel = RESOURCE_PANELS[resource];

	if (panel) {
		return panel;
	}

	// Ideally we will have all the resources mapped by compile time, in case we forgot or we are using a backend
	// that is newer than frontend, we should have this as fallback to avoid crashing the UI
	return {
		label: resource,
		description: i18n.t(
			'permissions.fallback_description',
			'Manage permissions for this resource.',
			{ ns: 'organizationsettings' },
		),
		icon: Shield,
		selectorPlaceholder: i18n.t(
			'permissions.fallback_placeholder',
			'Type ID, separate multiple with comma or space',
			{ ns: 'organizationsettings' },
		),
		docsAnchor: '',
	};
}

export function getResourceVerbs(
	resource: AuthZResource,
): readonly AuthZVerb[] {
	const match = permissionsType.data.resources.find(
		(entry) => entry.kind === resource,
	);

	if (!match) {
		return [];
	}

	// Role resource cannot have assignee verb
	// TODO(H4ad): Remove this once we get rid of frontend/lib/authz/hooks/useAuthZ/legacy.ts
	if (resource === 'role') {
		return match.allowedVerbs.filter((verb) => verb !== 'assignee');
	}

	return match.allowedVerbs;
}

export function getResourceType(resource: AuthZResource): CoretypesTypeDTO {
	const match = permissionsType.data.resources.find(
		(entry) => entry.kind === resource,
	);
	return match
		? (match.type as CoretypesTypeDTO)
		: CoretypesTypeDTO.metaresource;
}

export function supportsOnlySelected(
	verb: AuthZVerb,
): verb is ObjectScopedVerb {
	return OBJECT_SCOPED_VERB_SET.has(verb);
}
