import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from '@signozhq/icons';
import { Input } from '@signozhq/ui/input';
import AuthZButton from 'lib/authz/components/AuthZButton/AuthZButton';
import AuthZTooltip from 'lib/authz/components/AuthZTooltip/AuthZTooltip';
import ROUTES from 'constants/routes';
import {
	RoleCreatePermission,
	RoleListPermission,
} from 'lib/authz/hooks/useAuthZ/permissions/role.permissions';
import { useRolesFeatureGate } from 'hooks/useRolesFeatureGate';

import RolesListingTable from './RolesComponents/RolesListingTable';

import styles from './RolesSettings.module.scss';

function RolesSettings(): JSX.Element {
	const [searchQuery, setSearchQuery] = useState('');
	const history = useHistory();
	const { t } = useTranslation('settings');
	const { isRolesEnabled } = useRolesFeatureGate();

	return (
		<div data-testid="roles-settings">
			<div className={styles.rolesSettingsHeader}>
				<h3 className={styles.rolesSettingsHeaderTitle}>{t('roles_title')}</h3>
				<p className={styles.rolesSettingsHeaderDescription}>
					{isRolesEnabled
						? t('roles_description_enabled')
						: t('roles_description_disabled')}{' '}
					<a
						href="https://signoz.io/docs/manage/administrator-guide/iam/roles/"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.rolesSettingsHeaderLearnMore}
					>
						{t('roles_learn_more')}
					</a>
				</p>
			</div>
			<div className={styles.rolesSettingsContent}>
				<div className={styles.rolesSettingsToolbar}>
					<AuthZTooltip checks={[RoleListPermission]}>
						<Input
							type="search"
							placeholder={t('roles_search_placeholder')}
							value={searchQuery}
							onChange={(e): void => setSearchQuery(e.target.value)}
						/>
					</AuthZTooltip>
					{isRolesEnabled && (
						<AuthZButton
							checks={[RoleCreatePermission]}
							variant="solid"
							color="primary"
							className={styles.roleSettingsToolbarButton}
							onClick={(): void => history.push(ROUTES.ROLE_CREATE)}
						>
							<Plus size={14} />
							{t('roles_custom_role_button')}
						</AuthZButton>
					)}
				</div>
				<RolesListingTable searchQuery={searchQuery} />
			</div>
		</div>
	);
}

export default RolesSettings;
