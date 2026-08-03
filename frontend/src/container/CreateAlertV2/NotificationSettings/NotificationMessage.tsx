import { Input, Tooltip } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { Info } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

import { useCreateAlertState } from '../context';

function NotificationMessage(): JSX.Element {
	const { t } = useTranslation('create_alert');
	const { notificationSettings, setNotificationSettings } =
		useCreateAlertState();

	// const templateVariables = [
	// 	{ variable: '{{alertname}}', description: 'Name of the alert rule' },
	// 	{
	// 		variable: '{{value}}',
	// 		description: 'Current value that triggered the alert',
	// 	},
	// 	{
	// 		variable: '{{threshold}}',
	// 		description: 'Threshold value from alert condition',
	// 	},
	// 	{ variable: '{{unit}}', description: 'Unit of measurement for the metric' },
	// 	{
	// 		variable: '{{severity}}',
	// 		description: 'Alert severity level (Critical, Warning, Info)',
	// 	},
	// 	{
	// 		variable: '{{queryname}}',
	// 		description: 'Name of the query that triggered the alert',
	// 	},
	// 	{
	// 		variable: '{{labels}}',
	// 		description: 'All labels associated with the alert',
	// 	},
	// 	{
	// 		variable: '{{timestamp}}',
	// 		description: 'Timestamp when alert was triggered',
	// 	},
	// ];

	// const templateVariableContent = (
	// 	<div className="template-variable-content">
	// 		<Typography.Text strong>Available Template Variables:</Typography.Text>
	// 		{templateVariables.map((item) => (
	// 			<div className="template-variable-content-item" key={item.variable}>
	// 				<code>{item.variable}</code>
	// 				<Typography.Text>{item.description}</Typography.Text>
	// 			</div>
	// 		))}
	// 	</div>
	// );

	return (
		<div className="notification-message-container">
			<div className="notification-message-header">
				<div className="notification-message-header-content">
					<Typography.Text className="notification-message-header-title">
						{t('notification_message')}
						<Tooltip title={t('notification_message_tooltip')}>
							<Info size={16} />
						</Tooltip>
					</Typography.Text>
					<Typography.Text className="notification-message-header-description">
						{t('notification_message_desc')}
					</Typography.Text>
				</div>
				<div className="notification-message-header-actions">
					{/* TODO: Add back when the functionality is implemented */}
					{/* <Popover content={templateVariableContent}>
						<Button type="text">
							<Info size={12} />
							Variables
						</Button>
					</Popover> */}
				</div>
			</div>
			<Input.TextArea
				value={notificationSettings.description}
				onChange={(e): void =>
					setNotificationSettings({
						type: 'SET_DESCRIPTION',
						payload: e.target.value,
					})
				}
				placeholder={t('enter_notification_message')}
			/>
		</div>
	);
}

export default NotificationMessage;
