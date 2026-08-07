import { SolidInfoCircle } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

import {
	DisplayThresholdContainer,
	TypographHeading,
	Typography,
} from './styles';
import { DisplayThresholdProps } from './types';

function DisplayThreshold({ threshold }: DisplayThresholdProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	return (
		<DisplayThresholdContainer>
			<TypographHeading>
				{t('display_threshold.threshold', 'Threshold ')}
			</TypographHeading>
			<Typography>{threshold || <SolidInfoCircle size="md" />}</Typography>
		</DisplayThresholdContainer>
	);
}

export default DisplayThreshold;
