import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

import ThresholdColorSelect from '../../ThresholdColorSelect';

import styles from '../../ThresholdsSection.module.scss';

interface ThresholdColorFieldProps {
	testId: string;
	value: string;
	onChange: (hex: string) => void;
}

/** Labelled color picker, shared by every threshold variant. */
function ThresholdColorField({
	testId,
	value,
	onChange,
}: ThresholdColorFieldProps): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.field}>
			<Typography.Text className={styles.fieldLabel}>
				{t('dashboard_page_v2.panel_config.thresholds.color')}
			</Typography.Text>
			<ThresholdColorSelect value={value} testId={testId} onChange={onChange} />
		</div>
	);
}

export default ThresholdColorField;
