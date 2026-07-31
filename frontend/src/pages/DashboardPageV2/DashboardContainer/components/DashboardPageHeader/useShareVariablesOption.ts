import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ShareURLExtraOption } from 'components/HeaderRightSection/ShareURLModal';

import type { SelectedVariableValue } from '../../VariablesBar/selectionTypes';
import {
	ALL_SELECTED,
	variablesUrlParser,
} from '../../VariablesBar/utils/variablesUrlState';
import { selectVariableValues } from '../../store/slices/variableSelectionSlice';
import { useDashboardStore } from '../../store/useDashboardStore';

/**
 * The share-dialog "Include variables" option: serializes the current variable
 * selection into the `?variables=` param (ALL encoded as the sentinel) so a shared
 * link reproduces it for the recipient — who hydrates it into local storage on load,
 * after which the param is cleared (see useSeedVariableSelection). Returns undefined
 * when there is nothing selected to share.
 */
export function useShareVariablesOption(): ShareURLExtraOption | undefined {
	const { t } = useTranslation('dashboard');
	const dashboardId = useDashboardStore((s) => s.dashboardId);
	const selections = useDashboardStore(selectVariableValues(dashboardId ?? ''));

	return useMemo(() => {
		const names = Object.keys(selections);
		if (names.length === 0) {
			return undefined;
		}
		const urlShape: Record<string, SelectedVariableValue> = {};
		names.forEach((name) => {
			const selection = selections[name];
			urlShape[name] = selection.allSelected ? ALL_SELECTED : selection.value;
		});
		const serialized = variablesUrlParser.serialize(urlShape);
		return {
			label: t('dashboard_page_v2.variables_bar.include_variables'),
			apply: (params): void => {
				params.set('variables', serialized);
			},
		};
	}, [selections, t]);
}
