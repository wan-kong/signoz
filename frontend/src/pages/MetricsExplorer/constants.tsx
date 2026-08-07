import i18n from 'ReactI18';
import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import ExplorerPage from 'container/MetricsExplorer/Explorer';
import SummaryPage from 'container/MetricsExplorer/Summary';
import VolumeControlTab from 'container/MetricsExplorer/VolumeControl/components/VolumeControlTab/VolumeControlTab';
import { BarChart, Compass, Gauge, TowerControl } from '@signozhq/icons';
import SaveView from 'pages/SaveView';

export const Summary: TabRoutes = {
	Component: SummaryPage,
	name: (
		<div className="tab-item">
			<BarChart size={16} />{' '}
			{String(i18n.t('metrics_explorer.summary', 'Summary', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.METRICS_EXPLORER,
	key: ROUTES.METRICS_EXPLORER,
};

export const Explorer: TabRoutes = {
	Component: (): JSX.Element => <ExplorerPage />,
	name: (
		<div className="tab-item">
			<Compass size={16} />{' '}
			{String(i18n.t('metrics_explorer.explorer', 'Explorer', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.METRICS_EXPLORER_EXPLORER,
	key: ROUTES.METRICS_EXPLORER_EXPLORER,
};

export const Views: TabRoutes = {
	Component: SaveView,
	name: (
		<div className="tab-item">
			<TowerControl size={16} />{' '}
			{String(i18n.t('metrics_explorer.views', 'Views', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.METRICS_EXPLORER_VIEWS,
	key: ROUTES.METRICS_EXPLORER_VIEWS,
};

export const VolumeControl: TabRoutes = {
	Component: VolumeControlTab,
	name: (
		<div className="tab-item">
			<Gauge size={16} />{' '}
			{String(
				i18n.t('metrics_explorer.volume_control.badge', 'Volume Control', {
					ns: 'common',
				}),
			)}
		</div>
	),
	route: ROUTES.METRICS_EXPLORER_VOLUME_CONTROL,
	key: ROUTES.METRICS_EXPLORER_VOLUME_CONTROL,
};
