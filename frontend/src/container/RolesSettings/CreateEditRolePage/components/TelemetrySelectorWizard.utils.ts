import i18n from 'ReactI18';
import { AuthZResource } from 'lib/authz/hooks/useAuthZ/types';

import {
	ANY_RESOURCE_VALUE,
	ParsedSelector,
	QUERY_TYPES,
	QueryTypeId,
	QueryTypeOption,
	SelectorDraft,
	SelectorValidation,
	SUPPORTED_GRANT_KEY,
} from './TelemetrySelectorWizard.constants';

const METRIC_RESOURCES: ReadonlySet<AuthZResource> = new Set<AuthZResource>([
	'metrics',
	'meter-metrics',
]);

export function getQueryTypeOption(
	queryType: string,
): QueryTypeOption | undefined {
	return QUERY_TYPES.find((option) => option.id === queryType);
}

export function isQueryTypeAvailable(
	option: QueryTypeOption,
	resource: AuthZResource,
): boolean {
	return !option.metricsOnly || METRIC_RESOURCES.has(resource);
}

export function supportsKeyScoping(queryType: string): boolean {
	return getQueryTypeOption(queryType)?.supportsKeyScoping ?? false;
}

export function isAnyResourceValue(value: string): boolean {
	return value.trim() === ANY_RESOURCE_VALUE;
}

function splitSelector(selector: string): string[] {
	const parts = selector.split('/');

	if (parts.length <= 3) {
		return parts;
	}

	return [parts[0], parts[1], parts.slice(2).join('/')];
}

export function buildSelector({ queryType, value }: SelectorDraft): string {
	const trimmedValue = value.trim();

	if (!supportsKeyScoping(queryType) || !trimmedValue) {
		return `${queryType}/${ANY_RESOURCE_VALUE}`;
	}

	return `${queryType}/${SUPPORTED_GRANT_KEY}/${trimmedValue}`;
}

export function parseSelector(selector: string): ParsedSelector {
	const parts = splitSelector(selector.trim());

	return {
		queryType: getQueryTypeOption(parts[0])?.id,
		value: parts.length >= 3 ? parts[2] : '',
	};
}

/**
 * This does a basic validation, intentionally omitting deep validations since this is to be made at backend,
 * so this will allow to produce invalid selectors, and the validation will be done after the user try to save
 */
export function validateSelector(selector: string): SelectorValidation {
	const trimmed = selector.trim();

	if (!trimmed) {
		return {
			message: i18n.t('telemetry_wizard.enter_selector', 'Enter a selector.', {
				ns: 'organizationsettings',
			}),
			isError: true,
		};
	}

	if (trimmed === ANY_RESOURCE_VALUE) {
		return {
			message: i18n.t(
				'telemetry_wizard.allow_every_query_of_every_type',
				'Allow every query of every type.',
				{ ns: 'organizationsettings' },
			),
			isError: false,
		};
	}

	const parts = splitSelector(trimmed);
	const option = getQueryTypeOption(parts[0]);

	if (!option) {
		return {
			message: i18n.t(
				'telemetry_wizard.unsupported_query_type',
				'"{{queryType}}" is not a supported query type.',
				{ queryType: parts[0], ns: 'organizationsettings' },
			),
			isError: true,
		};
	}

	if (parts.length < 3) {
		if (parts.length === 2 && parts[1] !== ANY_RESOURCE_VALUE) {
			if (!option.supportsKeyScoping) {
				return {
					message: i18n.t(
						'telemetry_wizard.no_key_scoping',
						'This query type does not support key scoping. Use {{id}}/*',
						{ id: option.id, ns: 'organizationsettings' },
					),
					isError: false, // intentionally not an error
				};
			}

			return {
				message: i18n.t(
					'telemetry_wizard.selector_format_hint',
					'Use <query-type>/{{anyValue}} or <query-type>/{{grantKey}}/<value>.',
					{
						anyValue: ANY_RESOURCE_VALUE,
						grantKey: SUPPORTED_GRANT_KEY,
						ns: 'organizationsettings',
					},
				),
				isError: false, // intentionally not an error
			};
		}

		return {
			message: i18n.t(
				'telemetry_wizard.allow_every_query_label',
				'Allow every "{{label}}" query.',
				{ label: option.label, ns: 'organizationsettings' },
			),
			isError: false,
		};
	}

	const [, key, value] = parts;

	if (value === ANY_RESOURCE_VALUE) {
		return {
			message: i18n.t(
				'telemetry_wizard.allow_every_key_for_label',
				'Allow every {{key}} for {{label}} queries.',
				{ key, label: option.label, ns: 'organizationsettings' },
			),
			isError: false,
		};
	}

	if (!option.supportsKeyScoping) {
		return {
			message: i18n.t(
				'telemetry_wizard.no_key_scoping',
				'This query type does not support key scoping. Use {{id}}/*',
				{ id: option.id, ns: 'organizationsettings' },
			),
			isError: false, // intentionally not an error
		};
	}

	return {
		message: i18n.t(
			'telemetry_wizard.allow_key_value_for_label',
			'Allow {{key}}={{value}} for {{label}} queries.',
			{ key, value, label: option.label, ns: 'organizationsettings' },
		),
		isError: false,
	};
}

export function getDefaultSelector(queryType: QueryTypeId): string {
	return buildSelector({ queryType, value: '' });
}
