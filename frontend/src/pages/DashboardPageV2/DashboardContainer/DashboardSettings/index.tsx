import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Braces, Globe, Table } from '@signozhq/icons';
import {
	TabItemProps,
	TabsContent,
	TabsList,
	TabsRoot,
	TabsTrigger,
} from '@signozhq/ui/tabs';
import type { DashboardtypesGettableDashboardV2DTO } from 'api/generated/services/sigNoz.schemas';

import Overview from './Overview';
import PublicDashboardSettings from './PublicDashboard';
import VariablesSettings from './Variables';
import { useAppContext } from 'providers/App/App';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { USER_ROLES } from 'types/roles';

import { useDashboardStore } from '../store/useDashboardStore';
import styles from './DashboardSettings.module.scss';

interface DashboardSettingsProps {
	dashboard: DashboardtypesGettableDashboardV2DTO;
}

enum TabKeys {
	OVERVIEW = 'Overview',
	VARIABLES = 'Variables',
	PUBLISH = 'Publish',
}

const prefixIcons: Record<TabKeys, JSX.Element> = {
	[TabKeys.OVERVIEW]: <Table size={14} />,
	[TabKeys.VARIABLES]: <Braces size={14} />,
	[TabKeys.PUBLISH]: <Globe size={14} />,
};

function DashboardSettings({ dashboard }: DashboardSettingsProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const { user } = useAppContext();
	const { isCloudUser, isEnterpriseSelfHostedUser } = useGetTenantLicense();
	// Opened once per drawer mount (the drawer destroys on close); a deep-link
	// request lands us on the right tab.
	const settingsRequest = useDashboardStore((s) => s.settingsRequest);

	const enablePublicDashboard = isCloudUser || isEnterpriseSelfHostedUser;

	const items: TabItemProps[] = useMemo(
		() => [
			{
				key: TabKeys.OVERVIEW,
				label: t('dashboard_page_v2.settings.tabs.overview'),
				children: <Overview dashboard={dashboard} />,
			},
			{
				key: TabKeys.VARIABLES,
				label: t('dashboard_page_v2.settings.tabs.variables'),
				children: <VariablesSettings dashboard={dashboard} />,
				prefixIcon: <Braces size={14} />,
			},
			...(enablePublicDashboard
				? [
						{
							key: TabKeys.PUBLISH,
							label: t('dashboard_page_v2.settings.tabs.publish'),
							children: <PublicDashboardSettings dashboard={dashboard} />,
							disabled: user?.role !== USER_ROLES.ADMIN,
						},
					]
				: []),
		],
		[enablePublicDashboard, dashboard, user?.role, t],
	);

	return (
		<TabsRoot defaultValue={settingsRequest?.tab ?? TabKeys.OVERVIEW}>
			<TabsList variant="primary">
				{Object.values(TabKeys).map((key) => (
					<TabsTrigger value={key} key={key}>
						{prefixIcons[key]}
						{t(`dashboard_page_v2.settings.tabs.${key.toLowerCase()}`)}
					</TabsTrigger>
				))}
			</TabsList>

			{items.map((item) => (
				<TabsContent value={item.key} key={item.key} className={styles.tabsContent}>
					{item.children}
				</TabsContent>
			))}
		</TabsRoot>
	);
}

export default DashboardSettings;
