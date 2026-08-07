import i18n from 'ReactI18';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from '@signozhq/ui/dialog';
import { Divider } from '@signozhq/ui/divider';
import { ToggleGroupSimple } from '@signozhq/ui/toggle-group';
import { Typography } from '@signozhq/ui/typography';

import { PermissionScope } from '../../types';
import { getResourcePanel } from '../../permissions.config';
import ItemInputSelector from './ItemInputSelector';
import TelemetrySelectorWizard from './TelemetrySelectorWizard';

import styles from './ActionToggle.module.scss';
import { AuthZResource, AuthZVerb } from 'lib/authz/hooks/useAuthZ/types';
import { getActionLabel } from 'container/RolesSettings/ViewRolePage/components/permissionDisplay.utils';

const SCOPE_LABELS: Record<PermissionScope, string> = {
	[PermissionScope.NONE]: i18n.t('none', 'None', { ns: 'organizationsettings' }),
	[PermissionScope.ALL]: i18n.t('all', 'All', { ns: 'organizationsettings' }),
	[PermissionScope.ONLY_SELECTED]: i18n.t(
		'role_form_only_selected',
		'Only selected',
		{
			ns: 'organizationsettings',
		},
	),
};

interface ActionToggleProps {
	action: AuthZVerb;
	scope: string;
	selectedIds: string[];
	resource: AuthZResource;
	canSelectIndividually: boolean;
	onScopeChange: (scope: PermissionScope) => void;
	onSelectedIdsChange: (ids: string[]) => void;
	hasError?: boolean;
}

function ActionToggle({
	action,
	scope,
	selectedIds,
	resource,
	canSelectIndividually,
	onScopeChange,
	onSelectedIdsChange,
	hasError = false,
}: ActionToggleProps): JSX.Element {
	const panel = getResourcePanel(resource);

	const { t } = useTranslation('organizationsettings');

	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [pendingScope, setPendingScope] = useState<PermissionScope | null>(null);

	const displayLabel = getActionLabel(action);
	const selectorTestId = `${resource}-${action}`;

	const scopeItems: Array<{ value: PermissionScope; label: string }> =
		useMemo(() => {
			const items = [
				{ value: PermissionScope.NONE, label: SCOPE_LABELS[PermissionScope.NONE] },
				{ value: PermissionScope.ALL, label: SCOPE_LABELS[PermissionScope.ALL] },
			];
			if (canSelectIndividually) {
				items.push({
					value: PermissionScope.ONLY_SELECTED,
					label: SCOPE_LABELS[PermissionScope.ONLY_SELECTED],
				});
			}
			return items;
		}, [canSelectIndividually]);

	const handleToggleChange = useCallback(
		(value: string): void => {
			if (!value) {
				return;
			}

			const isLeavingOnlySelected =
				scope === PermissionScope.ONLY_SELECTED &&
				value !== PermissionScope.ONLY_SELECTED;
			const hasSelectedItems = selectedIds.length > 0;

			if (isLeavingOnlySelected && hasSelectedItems) {
				setPendingScope(value as PermissionScope);
				setConfirmDialogOpen(true);
				return;
			}

			onScopeChange(value as PermissionScope);
		},
		[scope, selectedIds.length, onScopeChange],
	);

	const handleConfirmScopeChange = useCallback((): void => {
		if (pendingScope) {
			onSelectedIdsChange([]);
			onScopeChange(pendingScope);
		}
		setConfirmDialogOpen(false);
		setPendingScope(null);
	}, [pendingScope, onSelectedIdsChange, onScopeChange]);

	const handleCancelScopeChange = useCallback((): void => {
		setConfirmDialogOpen(false);
		setPendingScope(null);
	}, []);

	return (
		<>
			<div
				className={styles.actionToggle}
				data-testid={`action-toggle-${resource}-${action}`}
			>
				<div className={styles.actionToggleHeader}>
					<Typography as="span" size="base">
						{displayLabel}
					</Typography>
					<ToggleGroupSimple
						type="single"
						size="sm"
						value={scope}
						onChange={handleToggleChange}
						items={scopeItems}
						className={styles.actionToggleScopeToggle}
						testId={`action-toggle-scope-${resource}-${action}`}
					/>
				</div>

				{scope === PermissionScope.ONLY_SELECTED && (
					<div className={styles.actionToggleSelectorWrapper}>
						<Divider />

						<ItemInputSelector
							placeholder={panel.selectorPlaceholder}
							selectedIds={selectedIds}
							onChange={onSelectedIdsChange}
							testId={selectorTestId}
							docsAnchor={panel.docsAnchor}
							hasError={hasError}
							prefixElement={
								panel.selectorType === 'telemetryBuilder' ? (
									<TelemetrySelectorWizard
										resource={resource}
										testId={selectorTestId}
										onAdd={(selector): void => {
											if (!selectedIds.includes(selector)) {
												onSelectedIdsChange([...selectedIds, selector]);
											}
										}}
									/>
								) : null
							}
						/>
					</div>
				)}
			</div>

			<ConfirmDialog
				open={confirmDialogOpen}
				onOpenChange={(next): void => {
					if (!next) {
						handleCancelScopeChange();
					}
				}}
				title={t('role_form_change_permission_scope_title')}
				confirmText={t('role_form_change_scope_confirm')}
				cancelText={t('cancel')}
				onConfirm={handleConfirmScopeChange}
				onCancel={handleCancelScopeChange}
			>
				<Typography>
					{t('role_form_scope_change_body_count', { count: selectedIds.length })}
					<br />
					<br />
					{t('role_form_scope_change_body_hint')}
				</Typography>
			</ConfirmDialog>
		</>
	);
}

export default ActionToggle;
