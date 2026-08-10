import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { ArrowLeft, SolidAlertTriangle } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { ConfirmDialog } from '@signozhq/ui/dialog';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
import { Skeleton } from 'antd';
import ErrorInPlace from 'components/ErrorInPlace/ErrorInPlace';
import ROUTES from 'constants/routes';
import { useRolesFeatureGate } from 'hooks/useRolesFeatureGate';
import useUrlQuery from 'hooks/useUrlQuery';
import { useNavigationBlocker } from 'hooks/useNavigationBlocker';
import AuthZButton from 'lib/authz/components/AuthZButton/AuthZButton';
import { withAuthZPage } from 'lib/authz/components/withAuthZ/withAuthZPage';
import { RouterContext } from 'lib/authz/components/withAuthZ/withAuthZ';
import {
	buildRoleReadPermission,
	buildRoleUpdatePermission,
	RoleCreatePermission,
} from 'lib/authz/hooks/useAuthZ/permissions/role.permissions';
import APIError from 'types/api/error';

import PermissionEditor from './components/PermissionEditor';
import { useCreateEditRolePageActions } from './useCreateEditRolePageActions';

import styles from './CreateEditRolePage.module.scss';
import { BrandedPermission } from 'lib/authz/hooks/useAuthZ/types';
import { AuthZGuardContent } from 'lib/authz/components/AuthZGuard/AuthZGuardContent';

function authzCheckFn(
	_props: object,
	router: RouterContext,
): BrandedPermission[] {
	const match = router.matchPath<{ roleId: string }>(ROUTES.ROLE_DETAILS);
	const roleId = match?.roleId ?? 'new';
	const isCreateMode = roleId === 'new';

	if (isCreateMode) {
		return [RoleCreatePermission];
	}
	return [];
}

function CreateEditRolePageContent(): JSX.Element {
	const history = useHistory();
	const { t } = useTranslation('settings');
	const { pathname } = useLocation();
	const urlQuery = useUrlQuery();
	const match = matchPath<{ roleId: string }>(pathname, {
		path: ROUTES.ROLE_DETAILS,
	});
	const roleId = match?.params?.roleId ?? 'new';
	const roleName = urlQuery.get('name') ?? '';
	const [hasJsonError, setHasJsonError] = useState(false);
	const { isRolesEnabled, isLoading: isFeatureGateLoading } =
		useRolesFeatureGate();

	const {
		formData,
		editorMode,
		setEditorMode,
		resources,
		setResources,
		isLoading,
		isSaving,
		hasUnsavedChanges,
		handleSave,
		handleCancel,
		handleFormChange,
		saveError,
		validationErrors,
		isCreateMode,
		loadError,
	} = useCreateEditRolePageActions(roleId, roleName);

	const { isBlocked, confirmNavigation, cancelNavigation, allowNextNavigation } =
		useNavigationBlocker(hasUnsavedChanges);

	const handleSaveAndNavigate = useCallback(async (): Promise<void> => {
		if (hasJsonError) {
			return;
		}

		const success = await handleSave();
		if (success) {
			allowNextNavigation();
			if (isCreateMode) {
				history.push(ROUTES.ROLES_SETTINGS);
			} else {
				const viewUrl = `${ROUTES.ROLE_DETAILS.replace(':roleId', roleId)}?name=${encodeURIComponent(roleName)}`;
				history.push(viewUrl);
			}
		}
	}, [
		handleSave,
		allowNextNavigation,
		history,
		hasJsonError,
		isCreateMode,
		roleId,
		roleName,
	]);

	if (!isRolesEnabled && !isFeatureGateLoading) {
		return (
			<div
				className={styles.createEditRolePage}
				data-testid="create-edit-role-page"
			>
				<div className={styles.createEditRolePageHeader}>
					<div className={styles.createEditRolePageHeaderLeft}>
						<Button
							variant="ghost"
							color="secondary"
							onClick={handleCancel}
							data-testid="cancel-button"
							className={styles.backButton}
						>
							<ArrowLeft size={16} />
						</Button>
						<Typography.Title level={3}>
							{isCreateMode ? t('create_role') : t('edit_role')}
						</Typography.Title>
					</div>
				</div>

				<ErrorInPlace
					error={
						new APIError({
							httpStatusCode: 403,
							error: {
								code: 'FEATURE_DISABLED',
								message: t('role_feature_disabled'),
								url: '',
								errors: [],
							},
						})
					}
					data-testid="feature-gate-error-banner"
				/>
			</div>
		);
	}

	if (isFeatureGateLoading) {
		return (
			<div className={styles.createEditRolePage}>
				<Skeleton active paragraph={{ rows: 8 }} />
			</div>
		);
	}

	const title = isCreateMode
		? t('create_role')
		: t('edit_role_title', {
				name:
					formData.name || (isLoading ? t('role_loading') : t('role_load_error')),
			});

	const canCheckRolePermissions = !isCreateMode && !!roleName;

	const saveChecks = isCreateMode
		? [RoleCreatePermission]
		: [buildRoleReadPermission(roleName), buildRoleUpdatePermission(roleName)];
	const isSaveCheckEnabled = isCreateMode || canCheckRolePermissions;

	return (
		<div
			className={styles.createEditRolePage}
			data-testid="create-edit-role-page"
		>
			<div className={styles.createEditRolePageHeader}>
				<div className={styles.createEditRolePageHeaderLeft}>
					<Button
						variant="ghost"
						color="secondary"
						onClick={handleCancel}
						disabled={isSaving}
						data-testid="cancel-button"
						className={styles.backButton}
					>
						<ArrowLeft size={16} />
					</Button>
					<Typography.Title level={3}>{title}</Typography.Title>
				</div>

				<div className={styles.createEditRolePageActions}>
					{hasUnsavedChanges && (
						<div className={styles.unsavedIndicator}>
							<span className={styles.unsavedDot} />
							<Typography as="span" size="base" className={styles.unsavedText}>
								{t('unsaved_changes')}
							</Typography>
						</div>
					)}
					<AuthZButton
						checks={saveChecks}
						authZEnabled={isSaveCheckEnabled}
						variant="solid"
						color="primary"
						onClick={handleSaveAndNavigate}
						loading={isSaving}
						disabled={!hasUnsavedChanges || hasJsonError}
						data-testid="save-button"
					>
						{isCreateMode ? t('create_role') : t('save_changes')}
					</AuthZButton>
				</div>
			</div>

			<AuthZGuardContent
				checks={canCheckRolePermissions ? [buildRoleReadPermission(roleName)] : []}
				fallbackOnLoading={
					<div className={styles.createEditRolePage}>
						<Skeleton active paragraph={{ rows: 8 }} />
					</div>
				}
			>
				<>
					{isLoading && (
						<div className={styles.createEditRolePage}>
							<Skeleton active paragraph={{ rows: 8 }} />
						</div>
					)}

					{loadError && (
						<ErrorInPlace
							error={loadError}
							height="auto"
							data-testid="role-load-error-banner"
							padding={0}
							bordered={true}
							className={styles.errorInPlaceContainer}
						/>
					)}

					{saveError && (
						<ErrorInPlace
							error={saveError}
							height="auto"
							data-testid="save-error-banner"
							padding={0}
							bordered={true}
							className={styles.errorInPlaceContainer}
						/>
					)}

					<div className={styles.createEditRolePageContent}>
						<div className={styles.createEditRolePageForm}>
							<div className={styles.formRow}>
								{isCreateMode ? (
									<div className={styles.formField}>
										<label htmlFor="role-name" className={styles.formLabel}>
											{t('role_name_label')}
										</label>
										<Input
											id="role-name"
											value={formData.name}
											onChange={(e): void => handleFormChange('name', e.target.value)}
											placeholder={t('role_name_placeholder')}
											data-testid="role-name-input"
										/>
									</div>
								) : null}
								<div className={styles.formField}>
									<label htmlFor="role-description" className={styles.formLabel}>
										{t('role_description_label')}
									</label>
									<Input
										id="role-description"
										value={formData.description}
										onChange={(e): void =>
											handleFormChange('description', e.target.value)
										}
										placeholder={t('role_description_placeholder')}
										data-testid="role-description-input"
									/>
								</div>
							</div>
						</div>

						<div className={styles.createEditRolePageDivider} />

						<PermissionEditor
							resources={resources}
							mode={editorMode}
							onModeChange={setEditorMode}
							onResourceChange={setResources}
							onJsonValidityChange={setHasJsonError}
							isLoading={isLoading}
							validationErrors={validationErrors}
						/>
					</div>
				</>
			</AuthZGuardContent>

			<ConfirmDialog
				open={isBlocked}
				onOpenChange={(next): void => {
					if (!next) {
						cancelNavigation();
					}
				}}
				title={t('discard_unsaved_title')}
				titleIcon={<SolidAlertTriangle size={14} color="#fdd600" />}
				confirmText={t('discard_button')}
				confirmColor="destructive"
				cancelText={t('keep_editing_button')}
				onConfirm={confirmNavigation}
				onCancel={cancelNavigation}
				data-testid="discard-changes-dialog"
			>
				<Typography>
					{isCreateMode ? t('discard_create_message') : t('discard_edit_message')}
				</Typography>
			</ConfirmDialog>
		</div>
	);
}

export default withAuthZPage(CreateEditRolePageContent, {
	checks: authzCheckFn,
	fallbackOnLoading: (
		<div className={styles.createEditRolePage}>
			<Skeleton active paragraph={{ rows: 8 }} />
		</div>
	),
});
