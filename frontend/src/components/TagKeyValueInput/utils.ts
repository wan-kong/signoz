// Tags are strictly key:value. Parse a raw input into a normalized `key:value`
// string, or null if it isn't a valid pair (both sides non-empty). The first
// colon separates key from value, so values may themselves contain colons
// (e.g. `url:http://x`).
export function parseKeyValueTag(raw: string): string | null {
	const trimmed = raw.trim();
	const idx = trimmed.indexOf(':');
	if (idx <= 0) {
		return null;
	}
	const key = trimmed.slice(0, idx).trim();
	const value = trimmed.slice(idx + 1).trim();
	if (!key || !value) {
		return null;
	}
	return `${key}:${value}`;
}

const TAG_KEY_REGEX = new RegExp('^[a-zA-Z$_@{#][a-zA-Z0-9$_@#{}:/-]*$');
const TAG_VALUE_REGEX = new RegExp('^[a-zA-Z0-9$_@#{}:.+=/-]*$');
const MAX_TAG_LEN = 32;

export type TagValidationErrorKey =
	| 'tag_key_value.validation.format'
	| 'tag_key_value.validation.key_chars'
	| 'tag_key_value.validation.value_chars'
	| 'tag_key_value.validation.max_length'
	| 'tag_key_value.validation.duplicate';

export type TagValidation =
	| { tag: string }
	| { errorKey: TagValidationErrorKey };

export function validateTag(
	raw: string,
	existingTags: string[],
	excludeIndex = -1,
): TagValidation {
	const normalized = parseKeyValueTag(raw);
	if (!normalized) {
		return { errorKey: 'tag_key_value.validation.format' };
	}
	const separator = normalized.indexOf(':');
	const key = normalized.slice(0, separator);
	const value = normalized.slice(separator + 1);
	if (!TAG_KEY_REGEX.test(key)) {
		return { errorKey: 'tag_key_value.validation.key_chars' };
	}
	if (!TAG_VALUE_REGEX.test(value)) {
		return { errorKey: 'tag_key_value.validation.value_chars' };
	}
	if (key.length > MAX_TAG_LEN || value.length > MAX_TAG_LEN) {
		return {
			errorKey: 'tag_key_value.validation.max_length',
		};
	}
	if (
		existingTags.some(
			(tag, index) => tag === normalized && index !== excludeIndex,
		)
	) {
		return { errorKey: 'tag_key_value.validation.duplicate' };
	}
	return { tag: normalized };
}
