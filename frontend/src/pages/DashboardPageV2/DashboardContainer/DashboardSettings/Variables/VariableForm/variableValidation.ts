import type { VariableFormModel } from '../variableFormModel';

/**
 * Name validation, mirroring V1: empty / whitespace are rejected, and the name
 * set includes self, but keeping your own (original) name is always allowed.
 */
export function getNameError(
	name: string,
	existingNames: string[],
	originalName: string,
): string | null {
	if (name === '') {
		return 'dashboard_page_v2.variables.name_required';
	}
	if (/\s/.test(name)) {
		return 'dashboard_page_v2.variables.name_no_whitespace';
	}
	if (name !== originalName && existingNames.includes(name)) {
		return 'dashboard_page_v2.variables.name_exists';
	}
	return null;
}

/** Rejects a dynamic variable reusing an attribute already bound elsewhere. */
export function getAttributeError(
	model: VariableFormModel,
	existingDynamicAttributes: string[],
): string | undefined {
	if (
		model.type === 'DYNAMIC' &&
		model.dynamicAttribute &&
		existingDynamicAttributes.includes(model.dynamicAttribute)
	) {
		return 'dashboard_page_v2.variables.attribute_exists';
	}
	return undefined;
}
