import i18n from 'ReactI18';
import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import ExplorerPage from 'container/ApiMonitoring/Explorer/Explorer';
import { Compass } from '@signozhq/icons';

export const Explorer: TabRoutes = {
	Component: ExplorerPage,
	name: (
		<div className="tab-item">
			<Compass size={16} />{' '}
			{String(i18n.t('api_monitoring.explorer', 'Explorer', { ns: 'common' }))}
		</div>
	),
	route: ROUTES.API_MONITORING,
	key: ROUTES.API_MONITORING,
};
