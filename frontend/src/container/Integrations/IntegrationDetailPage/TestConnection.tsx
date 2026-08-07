import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import './IntegrationDetailPage.styles.scss';

export enum ConnectionStates {
	Connected = 'connected',
	TestingConnection = 'testingConnection',
	NoDataSinceLong = 'noDataSinceLong',
	NotInstalled = 'notInstalled',
}

interface TestConnectionProps {
	connectionState: ConnectionStates;
}

function TestConnection(props: TestConnectionProps): JSX.Element {
	const { connectionState } = props;
	const { t } = useTranslation('integrations');

	const connectionLabel = (): string => {
		switch (connectionState) {
			case ConnectionStates.Connected:
				return t(
					'connection_state.connected',
					'This integration is working properly',
				);
			case ConnectionStates.TestingConnection:
				return t('connection_state.testing_connection', 'Listening for data...');
			case ConnectionStates.NoDataSinceLong:
				return t(
					'connection_state.no_data_since_long',
					'This integration has not received data in a while :/',
				);
			case ConnectionStates.NotInstalled:
			default:
				return '';
		}
	};

	return (
		<div className={cx('connection-container', connectionState)}>
			<ul className="connection-text">
				<li>{connectionLabel()}</li>
			</ul>
		</div>
	);
}

export default TestConnection;
