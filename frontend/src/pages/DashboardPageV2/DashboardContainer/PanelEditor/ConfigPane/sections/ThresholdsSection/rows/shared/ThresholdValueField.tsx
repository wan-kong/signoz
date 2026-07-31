import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';
import { Input } from 'antd';

import styles from '../../ThresholdsSection.module.scss';

interface ThresholdValueFieldProps {
	testId: string;
	value: number;
	/** Receives the raw input string; the draft hook parses it. */
	onChange: (raw: string) => void;
}

/** Labelled numeric "Value" input, shared by every threshold variant. */
function ThresholdValueField({
	testId,
	value,
	onChange,
}: ThresholdValueFieldProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const [raw, setRaw] = useState(String(value));

	useEffect(() => {
		setRaw((prev) => (Number(prev) === value ? prev : String(value)));
	}, [value]);

	return (
		<div className={styles.field}>
			<Typography.Text className={styles.fieldLabel}>
				{t('dashboard_page_v2.panel_config.thresholds.value')}
			</Typography.Text>
			<Input
				data-testid={testId}
				type="number"
				placeholder={t('dashboard_page_v2.panel_config.thresholds.value')}
				value={raw}
				onChange={(e): void => {
					setRaw(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</div>
	);
}

export default ThresholdValueField;
