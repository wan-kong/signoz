import i18n from 'ReactI18';
import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import BreakDownPage from 'container/MeterExplorer/Breakdown/BreakDown';
import ExplorerPage from 'container/MeterExplorer/Explorer';
import { Compass, TowerControl } from '@signozhq/icons';
import SaveView from 'pages/SaveView';

export const Explorer: TabRoutes = {
	Component: (): JSX.Element => <ExplorerPage />,
	name: (
		<div className="tab-item">
			<Compass size={16} />{' '}
			{String(i18n.t('meter_explorer.explorer', 'Explorer', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.METER_EXPLORER,
	key: ROUTES.METER_EXPLORER,
};

export const Views: TabRoutes = {
	Component: SaveView,
	name: (
		<div className="tab-item">
			<TowerControl size={16} />{' '}
			{String(i18n.t('meter_explorer.views', 'Views', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.METER_EXPLORER_VIEWS,
	key: ROUTES.METER_EXPLORER_VIEWS,
};

export const Meter: TabRoutes = {
	Component: BreakDownPage,
	name: (
		<div className="tab-item">
			<TowerControl size={16} />{' '}
			{String(i18n.t('meter_explorer.meter', 'Meter', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.METER,
	key: ROUTES.METER,
};
