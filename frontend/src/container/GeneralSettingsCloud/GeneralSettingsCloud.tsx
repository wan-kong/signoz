import { Trans, useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { Info } from '@signozhq/icons';

import './GeneralSettingsCloud.styles.scss';

export default function GeneralSettingsCloud(): JSX.Element {
	const { t } = useTranslation('generalSettings');

	return (
		<Card className="general-settings-container">
			<Info size={16} />
			<Typography.Text>
				<Trans
					t={t}
					ns="generalSettings"
					i18nKey="general_settings.retention_change_message"
				>
					Please <a href="mailto:cloud-support@signoz.io"> email us </a> or connect
					with us via chat support to change the retention period.
				</Trans>
			</Typography.Text>
		</Card>
	);
}
