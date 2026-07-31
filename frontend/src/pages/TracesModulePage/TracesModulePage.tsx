import { useLocation } from 'react-router-dom';
import logEvent from 'api/common/logEvent';
import RouteTab from 'components/RouteTab';
import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import history from 'lib/history';
import {
	getTracesExplorerRoute,
	getTracesFunnelRoute,
	getTracesSaveViewRoute,
} from './constants';

import './TracesModulePage.styles.scss';

function TracesModulePage(): JSX.Element {
	const { pathname } = useLocation();
	const routes: TabRoutes[] = [
		getTracesExplorerRoute(),
		getTracesFunnelRoute(),
		getTracesSaveViewRoute(),
	].filter(Boolean) as TabRoutes[];

	const handleTabChange = (activeRoute: string): void => {
		if (activeRoute === ROUTES.TRACES_FUNNELS) {
			void logEvent('Trace Funnels: visited from trace explorer page', {});
		}
	};

	return (
		<div className="traces-module-container">
			<RouteTab
				routes={routes}
				activeKey={
					pathname.includes(ROUTES.TRACES_FUNNELS) ? ROUTES.TRACES_FUNNELS : pathname
				}
				history={history}
				onChangeHandler={handleTabChange}
			/>
		</div>
	);
}

export default TracesModulePage;
