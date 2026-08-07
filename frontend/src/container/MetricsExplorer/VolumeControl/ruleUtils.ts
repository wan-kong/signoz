import i18n from 'ReactI18';
import { MetricreductionruletypesMatchTypeDTO } from 'api/generated/services/sigNoz.schemas';

export function isKeepMode(
	matchType: MetricreductionruletypesMatchTypeDTO,
): boolean {
	return matchType === MetricreductionruletypesMatchTypeDTO.keep;
}

export function getMatchTypeLabel(
	matchType: MetricreductionruletypesMatchTypeDTO,
): string {
	return isKeepMode(matchType)
		? i18n.t('volume_control.include', 'Include', { ns: 'common' })
		: i18n.t('volume_control.exclude', 'Exclude', { ns: 'common' });
}

export function getLabelVerb(
	matchType: MetricreductionruletypesMatchTypeDTO,
): string {
	return isKeepMode(matchType)
		? i18n.t('volume_control.include_lower', 'include', { ns: 'common' })
		: i18n.t('volume_control.exclude_lower', 'exclude', { ns: 'common' });
}
