import { useTranslation } from 'react-i18next';
import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import InfraMonitoringHostsV2 from 'container/InfraMonitoringHostsV2';
import InfraMonitoringK8sV2 from 'container/InfraMonitoringK8sV2';
import { Inbox } from '@signozhq/icons';

function TabItem({ labelKey }: { labelKey: string }): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className="tab-item">
			<Inbox size={16} /> {t(labelKey)}
		</div>
	);
}

function HostsContainer(): JSX.Element {
	return <InfraMonitoringHostsV2 />;
}

function KubernetesContainer(): JSX.Element {
	return <InfraMonitoringK8sV2 />;
}

export const Hosts: TabRoutes = {
	Component: HostsContainer,
	name: <TabItem labelKey="infra_constants.hosts" />,
	route: ROUTES.INFRASTRUCTURE_MONITORING_HOSTS,
	key: ROUTES.INFRASTRUCTURE_MONITORING_HOSTS,
};

export const Kubernetes: TabRoutes = {
	Component: KubernetesContainer,
	name: <TabItem labelKey="infra_constants.kubernetes" />,
	route: ROUTES.INFRASTRUCTURE_MONITORING_KUBERNETES,
	key: ROUTES.INFRASTRUCTURE_MONITORING_KUBERNETES,
};
