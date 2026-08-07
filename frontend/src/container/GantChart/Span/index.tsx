import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { DATE_TIME_FORMATS } from 'constants/dateTimeFormats';
import { convertTimeToRelevantUnit } from 'container/TraceDetail/utils';
import dayjs from 'dayjs';
import { useIsDarkMode } from 'hooks/useDarkMode';
import { useTimezone } from 'providers/Timezone';
import { toFixed } from 'utils/toFixed';

import { SpanBorder, SpanLine, SpanText, SpanWrapper } from './styles';

import '../GantChart.styles.scss';

interface SpanLengthProps {
	globalStart: number;
	startTime: number;
	name: string;
	width: string;
	leftOffset: string;
	bgColor: string;
	inMsCount: number;
}

function Span(props: SpanLengthProps): JSX.Element {
	const { width, leftOffset, bgColor, inMsCount, startTime, name, globalStart } =
		props;
	const isDarkMode = useIsDarkMode();
	const { t } = useTranslation('gant_chart');
	const { time, timeUnitName } = convertTimeToRelevantUnit(inMsCount);

	const { timezone } = useTimezone();

	useEffect(() => {
		document.documentElement.scrollTop = document.documentElement.clientHeight;
		document.documentElement.scrollLeft = document.documentElement.clientWidth;
	}, []);

	const getContent = (): JSX.Element => {
		const timeStamp = dayjs(startTime)
			.tz(timezone.value)
			.format(DATE_TIME_FORMATS.TIME_UTC_MS);
		const startTimeInMs = startTime - globalStart;
		return (
			<div>
				<Typography.Text style={{ marginBottom: '8px' }}>
					{' '}
					{t('gant_span.duration', 'Duration : {{value}}', { value: inMsCount })}
				</Typography.Text>
				<br />
				<Typography.Text style={{ marginBottom: '8px' }}>
					{t('gant_span.start_time', 'Start Time: {{startTime}}ms [{{timeStamp}}]', {
						startTime: startTimeInMs,
						timeStamp,
					})}{' '}
				</Typography.Text>
			</div>
		);
	};

	return (
		<SpanWrapper className="span-container">
			<SpanLine
				className="spanLine"
				isDarkMode={isDarkMode}
				bgColor={bgColor}
				leftOffset={leftOffset}
				width={width}
			/>

			<div>
				<Popover
					style={{
						left: `${leftOffset}%`,
					}}
					title={name}
					content={getContent()}
					trigger="hover"
					placement="left"
					autoAdjustOverflow
				>
					<SpanBorder
						className="spanTrack"
						isDarkMode={isDarkMode}
						bgColor={bgColor}
						leftOffset={leftOffset}
						width={width}
					/>
				</Popover>
			</div>

			<SpanText isDarkMode={isDarkMode} leftOffset={leftOffset}>{`${toFixed(
				time,
				2,
			)} ${timeUnitName}`}</SpanText>
		</SpanWrapper>
	);
}

export default Span;
