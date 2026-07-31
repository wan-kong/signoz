import { useTranslation } from 'react-i18next';
import AlertBreadcrumb from 'components/AlertBreadcrumb';
import ROUTES from 'constants/routes';
import CreateAlertChannels from 'container/CreateAlertChannels';
import { ChannelType } from 'container/CreateAlertChannels/config';
import styles from './styles.module.scss';

function ChannelsNew(): JSX.Element {
	const { t } = useTranslation('channels');
	return (
		<>
			<AlertBreadcrumb
				items={[
					{ title: t('breadcrumb_channels'), route: ROUTES.ALL_CHANNELS },
					{ title: t('breadcrumb_new_channel'), isLast: true },
				]}
			/>
			<div className={styles.content}>
				<CreateAlertChannels preType={ChannelType.Slack} />
			</div>
		</>
	);
}

export default ChannelsNew;
