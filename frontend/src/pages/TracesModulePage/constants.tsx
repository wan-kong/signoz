import { matchPath, useLocation } from 'react-router-dom';
import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import { Compass, Cone, TowerControl } from '@signozhq/icons';
import SaveView from 'pages/SaveView';
import TracesExplorer from 'pages/TracesExplorer';
import TracesFunnelDetails from 'pages/TracesFunnelDetails';
import TracesFunnels from 'pages/TracesFunnels';
import { useTranslation } from 'react-i18next';

interface TracesModuleTabLabelProps {
	icon: JSX.Element;
	labelKey: string;
}

function TracesModuleTabLabel({
	icon,
	labelKey,
}: TracesModuleTabLabelProps): JSX.Element {
	const { t } = useTranslation('trace');

	return (
		<div className="tab-item">
			{icon} {t(labelKey)}
		</div>
	);
}

function TracesFunnelRouteComponent(): JSX.Element {
	const { pathname } = useLocation();
	const isFunnelDetails = matchPath(pathname, ROUTES.TRACES_FUNNELS_DETAIL);

	return isFunnelDetails ? <TracesFunnelDetails /> : <TracesFunnels />;
}

const tracesExplorerRoute: TabRoutes = {
	Component: TracesExplorer,
	name: (
		<TracesModuleTabLabel icon={<Compass size={16} />} labelKey="tabs.explorer" />
	),
	route: ROUTES.TRACES_EXPLORER,
	key: ROUTES.TRACES_EXPLORER,
};

const tracesFunnelRoute: TabRoutes = {
	Component: TracesFunnelRouteComponent,
	name: (
		<TracesModuleTabLabel
			icon={<Cone className="funnel-icon" size={16} />}
			labelKey="tabs.funnels"
		/>
	),
	route: ROUTES.TRACES_FUNNELS,
	key: ROUTES.TRACES_FUNNELS,
};

const tracesSaveViewRoute: TabRoutes = {
	Component: SaveView,
	name: (
		<TracesModuleTabLabel
			icon={<TowerControl size={16} />}
			labelKey="tabs.views"
		/>
	),
	route: ROUTES.TRACES_SAVE_VIEWS,
	key: ROUTES.TRACES_SAVE_VIEWS,
};

export const getTracesExplorerRoute = (): TabRoutes => tracesExplorerRoute;

export const getTracesFunnelRoute = (): TabRoutes => tracesFunnelRoute;

export const getTracesSaveViewRoute = (): TabRoutes => tracesSaveViewRoute;
