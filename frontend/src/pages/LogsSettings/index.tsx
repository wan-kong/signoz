import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import RouteTab from 'components/RouteTab';
import history from 'lib/history';

import { getLogsSettingsRoute } from './config';

function LogsSettings(): JSX.Element {
	const { pathname } = useLocation();

	const routes = useMemo(() => getLogsSettingsRoute(), []);

	return <RouteTab activeKey={pathname} routes={routes} history={history} />;
}

export default LogsSettings;
