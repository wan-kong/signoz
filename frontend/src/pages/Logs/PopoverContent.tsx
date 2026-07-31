import { InputNumber, Row, Space } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';

interface PopoverContentProps {
	linesPerRow: number;
	handleLinesPerRowChange: (l: unknown) => void;
}

function PopoverContent({
	linesPerRow,
	handleLinesPerRowChange,
}: PopoverContentProps): JSX.Element {
	const { t } = useTranslation('logs');

	return (
		<Row align="middle">
			<Space align="center">
				<Typography>{t('controls.max_lines_per_row')} </Typography>
				<InputNumber
					min={1}
					max={10}
					value={linesPerRow}
					onChange={handleLinesPerRowChange}
				/>
			</Space>
		</Row>
	);
}

export default PopoverContent;
