import { useTranslation } from 'react-i18next';
import { ToggleGroupSimple } from '@signozhq/ui/toggle-group';
import { Typography } from '@signozhq/ui/typography';
import { DisconnectedValuesMode } from 'lib/uPlotV2/config/types';

interface DisconnectValuesModeToggleProps {
	value: DisconnectedValuesMode;
	onChange: (value: DisconnectedValuesMode) => void;
}

export default function DisconnectValuesModeToggle({
	value,
	onChange,
}: DisconnectValuesModeToggleProps): JSX.Element {
	const { t } = useTranslation('new_widget_components');
	return (
		<ToggleGroupSimple
			type="single"
			value={value}
			size="lg"
			onChange={(newValue: string): void => {
				if (newValue) {
					onChange(newValue as DisconnectedValuesMode);
				}
			}}
			items={[
				{
					value: DisconnectedValuesMode.Never,
					'aria-label': t('disconnect_values.never', 'Never'),
					label: (
						<Typography.Text className="section-heading-small">
							{t('disconnect_values.never', 'Never')}
						</Typography.Text>
					),
				},
				{
					value: DisconnectedValuesMode.Threshold,
					'aria-label': t('disconnect_values.threshold', 'Threshold'),
					label: (
						<Typography.Text className="section-heading-small">
							{t('disconnect_values.threshold', 'Threshold')}
						</Typography.Text>
					),
				},
			]}
		/>
	);
}
