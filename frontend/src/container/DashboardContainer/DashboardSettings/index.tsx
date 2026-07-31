import { Button, Tabs, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { Braces, Globe, Table } from '@signozhq/icons';
import { useAppContext } from 'providers/App/App';
import { USER_ROLES } from 'types/roles';

import { VariablesSettingsTabHandle } from '../DashboardDescription/types';
import DashboardVariableSettings from './DashboardVariableSettings';
import GeneralDashboardSettings from './General';
import PublicDashboardSetting from './PublicDashboard';

import './DashboardSettingsContent.styles.scss';

function DashboardSettings({
	variablesSettingsTabHandle,
}: {
	variablesSettingsTabHandle: VariablesSettingsTabHandle;
}): JSX.Element {
	const { user } = useAppContext();
	const { isCloudUser, isEnterpriseSelfHostedUser } = useGetTenantLicense();
	const { t } = useTranslation('dashboard');

	const enablePublicDashboard = isCloudUser || isEnterpriseSelfHostedUser;

	const publicDashboardItem = {
		label: (
			<Tooltip
				title={
					user?.role !== USER_ROLES.ADMIN
						? t('dashboard_container.settings.admin_publish_tooltip')
						: ''
				}
				placement="right"
			>
				<Button
					type="text"
					icon={<Globe size={14} />}
					className={`public-dashboard-btn ${
						user?.role !== USER_ROLES.ADMIN ? 'disabled-btn' : ''
					}`}
				>
					{t('dashboard_page_v2.settings.tabs.publish')}
				</Button>
			</Tooltip>
		),
		key: 'public-dashboard',
		children: <PublicDashboardSetting />,
		disabled: user?.role !== USER_ROLES.ADMIN,
	};

	const items = [
		{
			label: (
				<Button type="text" icon={<Table size={14} />} className="overview-btn">
					{t('dashboard_page_v2.settings.tabs.overview')}
				</Button>
			),
			key: 'general',
			children: <GeneralDashboardSettings />,
		},
		{
			label: (
				<Button type="text" icon={<Braces size={14} />} className="variables-btn">
					{t('dashboard_page_v2.settings.tabs.variables')}
				</Button>
			),
			key: 'variables',
			children: (
				<DashboardVariableSettings
					variablesSettingsTabHandle={variablesSettingsTabHandle}
				/>
			),
		},
		...(enablePublicDashboard ? [publicDashboardItem] : []),
	];

	return <Tabs items={items} animated className="settings-tabs" />;
}

export default DashboardSettings;
