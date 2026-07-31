import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@signozhq/ui/sonner';
import { useErrorModal } from 'providers/ErrorModalProvider';
import APIError from 'types/api/error';

import { useOptimisticPatch } from '../../../hooks/useOptimisticPatch';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { formModelToDto } from '../variableAdapters';
import type { VariableFormModel } from '../variableFormModel';
import { buildVariablesPatch } from '../utils/variablePatchOps';

interface UseSaveVariables {
	save: (variables: VariableFormModel[]) => Promise<boolean>;
	isSaving: boolean;
}

export function useSaveVariables(): UseSaveVariables {
	const { t } = useTranslation('dashboard');
	const dashboardId = useDashboardStore((s) => s.dashboardId);
	const { patchAsync } = useOptimisticPatch();
	const { showErrorModal } = useErrorModal();
	const [isSaving, setIsSaving] = useState(false);

	const save = useCallback(
		async (variables: VariableFormModel[]): Promise<boolean> => {
			if (!dashboardId) {
				return false;
			}
			const dtos = variables.map(formModelToDto);
			try {
				setIsSaving(true);
				await patchAsync(buildVariablesPatch(dtos));
				toast.success(t('dashboard_page_v2.variables.variables_updated'));
				return true;
			} catch (error) {
				showErrorModal(error as APIError);
				return false;
			} finally {
				setIsSaving(false);
			}
		},
		[dashboardId, patchAsync, showErrorModal, t],
	);

	return { save, isSaving };
}
