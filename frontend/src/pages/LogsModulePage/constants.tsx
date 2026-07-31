import { TabRoutes } from 'components/RouteTab/types';
import ROUTES from 'constants/routes';
import { Compass, TowerControl, Workflow } from '@signozhq/icons';
import LogsExplorer from 'pages/LogsExplorer';
import Pipelines from 'pages/Pipelines';
import SaveView from 'pages/SaveView';
import { useTranslation } from 'react-i18next';

interface LogsModuleTabLabelProps {
	icon: JSX.Element;
	labelKey: string;
}

function LogsModuleTabLabel({
	icon,
	labelKey,
}: LogsModuleTabLabelProps): JSX.Element {
	const { t } = useTranslation('logs');

	return (
		<div className="tab-item">
			{icon} {t(labelKey)}
		</div>
	);
}

const logsModuleRoutes: TabRoutes[] = [
	{
		Component: LogsExplorer,
		name: (
			<LogsModuleTabLabel icon={<Compass size={16} />} labelKey="tabs.explorer" />
		),
		route: ROUTES.LOGS,
		key: ROUTES.LOGS,
	},
	{
		Component: Pipelines,
		name: (
			<LogsModuleTabLabel
				icon={<Workflow size={16} />}
				labelKey="tabs.pipelines"
			/>
		),
		route: ROUTES.LOGS_PIPELINES,
		key: ROUTES.LOGS_PIPELINES,
	},
	{
		Component: SaveView,
		name: (
			<LogsModuleTabLabel
				icon={<TowerControl size={16} />}
				labelKey="tabs.views"
			/>
		),
		route: ROUTES.LOGS_SAVE_VIEWS,
		key: ROUTES.LOGS_SAVE_VIEWS,
	},
];

export const getLogsModuleRoutes = (): TabRoutes[] => logsModuleRoutes;
