import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';

interface INoDataProps {
	id: string;
}

function NoData(props: INoDataProps): JSX.Element {
	const { t } = useTranslation('trace');
	const { id } = props;
	return (
		<Typography.Text>
			{t('no_trace_found', 'No Trace found with the id: {{id}}', { id })}
		</Typography.Text>
	);
}

export default NoData;
