import { useTranslation } from 'react-i18next';
import { SelectSimple } from '@signozhq/ui/select';
import { Switch } from '@signozhq/ui/switch';
import { Typography } from '@signozhq/ui/typography';
import { RelativeDurationOptions } from 'container/TopNav/DateTimeSelectionV2/constants';

import styles from './PublicDashboardSettingsForm.module.scss';

interface PublicDashboardSettingsFormProps {
	timeRangeEnabled: boolean;
	defaultTimeRange: string;
	disabled: boolean;
	onTimeRangeEnabledChange: (value: boolean) => void;
	onDefaultTimeRangeChange: (value: string) => void;
}

function PublicDashboardSettingsForm({
	timeRangeEnabled,
	defaultTimeRange,
	disabled,
	onTimeRangeEnabledChange,
	onDefaultTimeRangeChange,
}: PublicDashboardSettingsFormProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	return (
		<>
			<div className={styles.switchRow}>
				<Switch
					testId="public-dashboard-time-range-toggle"
					value={timeRangeEnabled}
					disabled={disabled}
					onChange={onTimeRangeEnabledChange}
				>
					{t('dashboard_page_v2.public_dashboard.enable_time_range')}
				</Switch>
			</div>

			<div className={styles.fieldGroup}>
				<Typography.Text className={styles.fieldLabel}>
					{t('dashboard_page_v2.public_dashboard.default_time_range')}
				</Typography.Text>
				<SelectSimple
					className={styles.timeRangeSelect}
					testId="public-dashboard-default-time-range"
					placeholder={t(
						'dashboard_page_v2.public_dashboard.select_default_time_range',
					)}
					items={RelativeDurationOptions}
					value={defaultTimeRange}
					disabled={disabled}
					withPortal={false}
					onChange={(value): void => onDefaultTimeRangeChange(value as string)}
				/>
			</div>
		</>
	);
}

export default PublicDashboardSettingsForm;
