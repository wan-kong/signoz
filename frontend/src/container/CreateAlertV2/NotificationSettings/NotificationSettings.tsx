import { Input } from '@signozhq/ui/input';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';

import { useCreateAlertState } from '../context';
import {
	RE_NOTIFICATION_CONDITION_OPTIONS,
	RE_NOTIFICATION_TIME_UNIT_OPTIONS,
} from '../context/constants';
import AdvancedOptionItem from '../EvaluationSettings/AdvancedOptionItem';
import Stepper from '../Stepper';
import MultipleNotifications from './MultipleNotifications';
import NotificationMessage from './NotificationMessage';

import './styles.scss';

function NotificationSettings(): JSX.Element {
	const { notificationSettings, setNotificationSettings } =
		useCreateAlertState();
	const { t } = useTranslation('create_alert');

	const repeatNotificationsInput = (
		<div className="repeat-notifications-input">
			<Typography.Text>{t('every')}</Typography.Text>
			<Input
				value={notificationSettings.reNotification.value}
				placeholder={t('enter_time_interval')}
				disabled={!notificationSettings.reNotification.enabled}
				type="number"
				onChange={(e): void => {
					setNotificationSettings({
						type: 'SET_RE_NOTIFICATION',
						payload: {
							enabled: notificationSettings.reNotification.enabled,
							value: parseInt(e.target.value, 10),
							unit: notificationSettings.reNotification.unit,
							conditions: notificationSettings.reNotification.conditions,
						},
					});
				}}
				data-testid="repeat-notifications-time-input"
			/>
			<Select
				value={notificationSettings.reNotification.unit || null}
				placeholder={t('select_unit')}
				disabled={!notificationSettings.reNotification.enabled}
				options={RE_NOTIFICATION_TIME_UNIT_OPTIONS}
				onChange={(value): void => {
					setNotificationSettings({
						type: 'SET_RE_NOTIFICATION',
						payload: {
							enabled: notificationSettings.reNotification.enabled,
							value: notificationSettings.reNotification.value,
							unit: value,
							conditions: notificationSettings.reNotification.conditions,
						},
					});
				}}
				data-testid="repeat-notifications-unit-select"
			/>
			<Typography.Text>{t('while')}</Typography.Text>
			<Select
				mode="multiple"
				value={notificationSettings.reNotification.conditions || null}
				placeholder={t('select_conditions')}
				disabled={!notificationSettings.reNotification.enabled}
				options={RE_NOTIFICATION_CONDITION_OPTIONS}
				onChange={(value): void => {
					setNotificationSettings({
						type: 'SET_RE_NOTIFICATION',
						payload: {
							enabled: notificationSettings.reNotification.enabled,
							value: notificationSettings.reNotification.value,
							unit: notificationSettings.reNotification.unit,
							conditions: value,
						},
					});
				}}
				data-testid="repeat-notifications-conditions-select"
			/>
		</div>
	);

	return (
		<div className="notification-settings-container">
			<Stepper stepNumber={3} label={t('notification_settings')} />
			<NotificationMessage />
			<div className="notification-settings-content">
				<MultipleNotifications />
				<AdvancedOptionItem
					title={t('repeat_notifications')}
					description={t('repeat_notifications_desc')}
					tooltipText={t('repeat_notifications_tooltip')}
					input={repeatNotificationsInput}
					onToggle={(): void => {
						setNotificationSettings({
							type: 'SET_RE_NOTIFICATION',
							payload: {
								...notificationSettings.reNotification,
								enabled: !notificationSettings.reNotification.enabled,
							},
						});
					}}
					defaultShowInput={notificationSettings.reNotification.enabled}
					data-testid="repeat-notifications-container"
				/>
			</div>
		</div>
	);
}

export default NotificationSettings;
