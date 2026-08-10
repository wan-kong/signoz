import { useTranslation } from 'react-i18next';
import styles from 'container/RolesSettings/ViewRolePage/ViewRolePage.module.scss';
import { Button } from '@signozhq/ui/button';
import { Divider } from '@signozhq/ui/divider';
import AuthZButton from 'lib/authz/components/AuthZButton/AuthZButton';
import {
	buildRoleDeletePermission,
	buildRoleReadPermission,
	buildRoleUpdatePermission,
} from 'lib/authz/hooks/useAuthZ/permissions/role.permissions';
import { TooltipSimple } from '@signozhq/ui/tooltip';

export function ViewRolePageHeaderActions({
	isRoleLoading,
	isManaged,
	roleName,
	handleOpenDeleteModal,
	handleRedirectToUpdate,
}: {
	isRoleLoading: boolean;
	isManaged: boolean;
	roleName: string;
	handleOpenDeleteModal: () => void;
	handleRedirectToUpdate: () => void;
}): JSX.Element {
	const { t } = useTranslation('organizationsettings');

	const renderDeleteButton = (): JSX.Element => {
		if (isRoleLoading) {
			return (
				<Button
					variant="link"
					color="destructive"
					disabled
					data-testid="delete-button"
					className={styles.deleteButton}
				>
					{t('delete')}
				</Button>
			);
		}

		if (isManaged) {
			return (
				<TooltipSimple title={t('role_view_managed_roles_cannot_be_deleted')}>
					<Button
						variant="link"
						color="destructive"
						disabled
						data-testid="delete-button"
						className={styles.deleteButton}
					>
						{t('delete')}
					</Button>
				</TooltipSimple>
			);
		}

		return (
			<AuthZButton
				checks={[buildRoleDeletePermission(roleName)]}
				authZEnabled={!!roleName}
				variant="link"
				color="destructive"
				onClick={handleOpenDeleteModal}
				data-testid="delete-button"
				className={styles.deleteButton}
			>
				{t('delete')}
			</AuthZButton>
		);
	};

	const renderUpdateButton = (): JSX.Element => {
		if (isRoleLoading) {
			return (
				<Button variant="solid" color="primary" disabled data-testid="save-button">
					{t('update')}
				</Button>
			);
		}

		if (isManaged) {
			return (
				<TooltipSimple title={t('role_view_managed_roles_cannot_be_updated')}>
					<Button variant="solid" color="primary" disabled data-testid="save-button">
						{t('update')}
					</Button>
				</TooltipSimple>
			);
		}

		return (
			<AuthZButton
				checks={[
					buildRoleReadPermission(roleName),
					buildRoleUpdatePermission(roleName),
				]}
				authZEnabled={!!roleName}
				variant="solid"
				color="primary"
				data-testid="save-button"
				onClick={handleRedirectToUpdate}
			>
				{t('update')}
			</AuthZButton>
		);
	};

	return (
		<div className={styles.viewRolePageActions}>
			{renderDeleteButton()}
			<Divider type="vertical" />
			{renderUpdateButton()}
		</div>
	);
}
