import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { Ellipsis } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { DropdownMenuSimple } from '@signozhq/ui/dropdown-menu';
import { toast } from '@signozhq/ui/sonner';
import { convertToApiError } from 'api/ErrorResponseHandlerForGeneratedAPIs';
import {
	createRule,
	deleteRuleByID,
	invalidateListRules,
	patchRuleByID,
} from 'api/generated/services/rules';
import type {
	RenderErrorResponseDTO,
	RuletypesPostableRuleDTO,
} from 'api/generated/services/sigNoz.schemas';
import type { AxiosError } from 'axios';

import type { AlertRule } from '../types';
import { ALERT_ACTIONS, alertActionLogEvent } from '../utils';
import styles from './ActionsMenu.module.scss';

interface ActionsMenuProps {
	rule: AlertRule;
	onEdit: (rule: AlertRule, options?: { newTab?: boolean }) => void;
	isLoading?: boolean;
}

function ActionsMenu({
	rule,
	onEdit,
	isLoading: externalLoading = false,
}: ActionsMenuProps): JSX.Element {
	const { t } = useTranslation('alerts');
	const queryClient = useQueryClient();

	const handleToggle = useCallback((): void => {
		alertActionLogEvent(ALERT_ACTIONS.TOGGLE, rule);
		const newDisabled = !rule.disabled;
		toast.promise(
			patchRuleByID({ id: rule.id ?? '' }, {
				disabled: newDisabled,
			} as RuletypesPostableRuleDTO).then(() => invalidateListRules(queryClient)),
			{
				loading: newDisabled
					? t('alert_rules.actions.disabling')
					: t('alert_rules.actions.enabling'),
				success: newDisabled
					? t('alert_rules.actions.disabled')
					: t('alert_rules.actions.enabled'),
				error: (error): string => {
					const apiError = convertToApiError(
						error as AxiosError<RenderErrorResponseDTO>,
					);
					return (
						apiError?.getErrorMessage() || t('alert_rules.actions.toggle_failed')
					);
				},
				position: 'top-right',
			},
		);
	}, [rule, queryClient, t]);

	const handleEdit = useCallback((): void => {
		alertActionLogEvent(ALERT_ACTIONS.EDIT, rule);
		onEdit(rule);
	}, [rule, onEdit]);

	const handleEditNewTab = useCallback((): void => {
		alertActionLogEvent(ALERT_ACTIONS.EDIT, rule);
		onEdit(rule, { newTab: true });
	}, [rule, onEdit]);

	const handleClone = useCallback((): void => {
		alertActionLogEvent(ALERT_ACTIONS.CLONE, rule);
		toast.promise(
			createRule({
				...rule,
				alert: `${rule.alert} - Copy`,
			} as RuletypesPostableRuleDTO).then(async (response) => {
				await invalidateListRules(queryClient);
				const newRule = response.data;
				if (newRule) {
					onEdit(newRule as AlertRule);
				}
				return response;
			}),
			{
				loading: t('alert_rules.actions.cloning'),
				success: t('alert_rules.actions.cloned'),
				error: (error): string => {
					const apiError = convertToApiError(
						error as AxiosError<RenderErrorResponseDTO>,
					);
					return (
						apiError?.getErrorMessage() || t('alert_rules.actions.clone_failed')
					);
				},
				position: 'top-right',
			},
		);
	}, [rule, queryClient, onEdit, t]);

	const handleDelete = useCallback((): void => {
		alertActionLogEvent(ALERT_ACTIONS.DELETE, rule);
		toast.promise(
			deleteRuleByID({ id: rule.id ?? '' }).then(() =>
				invalidateListRules(queryClient),
			),
			{
				loading: t('alert_rules.actions.deleting'),
				success: t('alert_rules.actions.deleted'),
				error: (error): string => {
					const apiError = convertToApiError(
						error as AxiosError<RenderErrorResponseDTO>,
					);
					return (
						apiError?.getErrorMessage() || t('alert_rules.actions.delete_failed')
					);
				},
				position: 'top-right',
			},
		);
	}, [rule, queryClient, t]);

	const menuItems = useMemo(
		() => [
			{
				key: 'toggle',
				label: rule.disabled
					? t('alert_rules.actions.enable')
					: t('alert_rules.actions.disable'),
				disabled: externalLoading,
				onClick: handleToggle,
			},
			{
				key: 'edit',
				label: t('alert_rules.actions.edit'),
				disabled: externalLoading,
				onClick: handleEdit,
			},
			{
				key: 'edit-new-tab',
				label: t('alert_rules.actions.edit_in_new_tab'),
				disabled: externalLoading,
				onClick: handleEditNewTab,
			},
			{
				key: 'clone',
				label: t('alert_rules.actions.clone'),
				disabled: externalLoading,
				onClick: handleClone,
			},
			{ key: 'divider', type: 'divider' as const },
			{
				key: 'delete',
				label: t('alert_rules.actions.delete'),
				disabled: externalLoading,
				danger: true,
				onClick: handleDelete,
			},
		],
		[
			rule.disabled,
			externalLoading,
			handleToggle,
			handleEdit,
			handleEditNewTab,
			handleClone,
			handleDelete,
			t,
		],
	);

	const handleClick = (e: React.MouseEvent): void => {
		e.stopPropagation();
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div onClick={handleClick}>
			<DropdownMenuSimple menu={{ items: menuItems }} align="end">
				<Button
					variant="outlined"
					color="secondary"
					size="icon"
					className={styles.actionButton}
					data-testid="alert-actions"
				>
					<Ellipsis size={16} />
				</Button>
			</DropdownMenuSimple>
		</div>
	);
}

export default ActionsMenu;
