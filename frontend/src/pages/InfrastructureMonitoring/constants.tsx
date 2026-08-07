import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Loadable from 'components/Loadable';
import { TabRoutes } from 'components/RouteTab/types';
import Spinner from 'components/Spinner';
import ROUTES from 'constants/routes';
import InfraMonitoringHosts from 'container/InfraMonitoringHosts';
import InfraMonitoringK8s from 'container/InfraMonitoringK8s';
import { useIsInfraMonitoringV2 } from 'hooks/useIsInfraMonitoringV2';
import { Inbox } from '@signozhq/icons';

const InfraMonitoringHostsV2 = Loadable(
	() => import('container/InfraMonitoringHostsV2'),
);

const InfraMonitoringK8sV2 = Loadable(
	() => import('container/InfraMonitoringK8sV2'),
);

function TabItem({ labelKey }: { labelKey: string }): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	return (
		<div className="tab-item">
			<Inbox size={16} /> {t(labelKey)}
		</div>
	);
}

function HostsContainer(): JSX.Element {
	const isInfraMonitoringV2 = useIsInfraMonitoringV2();
	const { t } = useTranslation('infraMonitoring');

	if (isInfraMonitoringV2) {
		return (
			<Suspense
				fallback={
					<Spinner size="large" tip={t('infra_constants.loading', 'Loading...')} />
				}
			>
				<InfraMonitoringHostsV2 />
			</Suspense>
		);
	}

	return <InfraMonitoringHosts />;
}

function KubernetesContainer(): JSX.Element {
	const isInfraMonitoringV2 = useIsInfraMonitoringV2();
	const { t } = useTranslation('infraMonitoring');

	if (isInfraMonitoringV2) {
		return (
			<Suspense
				fallback={
					<Spinner size="large" tip={t('infra_constants.loading', 'Loading...')} />
				}
			>
				<InfraMonitoringK8sV2 />
			</Suspense>
		);
	}

	return <InfraMonitoringK8s />;
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
