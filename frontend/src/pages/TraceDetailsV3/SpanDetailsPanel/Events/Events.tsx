import { useState } from 'react';
import { Input } from '@signozhq/ui/input';
import { Collapse, Modal } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { getYAxisFormattedValue } from 'components/Graph/yAxisConfig';
import { Diamond } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { SpanV3 } from 'types/api/trace/getTraceV3';

import EventAttribute from './components/EventAttribute';
import NoData from './NoData/NoData';

import styles from './Events.module.scss';

interface IEventsTableProps {
	span: SpanV3;
	startTime: number;
	isSearchVisible: boolean;
}

function EventsTable(props: IEventsTableProps): JSX.Element {
	const { span, startTime, isSearchVisible } = props;
	const { t } = useTranslation('trace');
	const [fieldSearchInput, setFieldSearchInput] = useState<string>('');
	const [modalContent, setModalContent] = useState<{
		title: string;
		content: string;
	} | null>(null);

	const showAttributeModal = (title: string, content: string): void => {
		setModalContent({ title, content });
	};

	const handleCancel = (): void => {
		setModalContent(null);
	};

	const events = span.events;

	return (
		<div>
			{events.length === 0 && (
				<div className={styles.noEvents}>
					<NoData name="events" />
				</div>
			)}
			<div className={styles.eventsContainer}>
				{isSearchVisible && events.length > 0 && (
					<Input
						autoFocus
						placeholder={t('trace_details.events.search_placeholder')}
						value={fieldSearchInput}
						onChange={(e): void => setFieldSearchInput(e.target.value)}
					/>
				)}
				{events
					.filter((eve) =>
						eve.name?.toLowerCase().includes(fieldSearchInput.toLowerCase()),
					)
					.map((event) => {
						const { name, attributeMap, timeUnixNano } = event;
						const eventKey = `${name} ${JSON.stringify(attributeMap)}`;

						return (
							<div className={styles.event} key={eventKey}>
								<Collapse
									size="small"
									defaultActiveKey="1"
									expandIconPosition="right"
									items={[
										{
											key: '1',
											label: (
												<div className={styles.collapseTitle}>
													<Diamond size={14} className={styles.diamond} />
													<Typography.Text>{name}</Typography.Text>
												</div>
											),
											children: (
												<div className={styles.eventDetails}>
													<div className={styles.attributeContainer} key="timeUnixNano">
														<Typography.Text className={styles.attributeKey}>
															{t('trace_details.events.start_time')}
														</Typography.Text>
														<div className={styles.timestampContainer}>
															<Typography.Text className={styles.attributeValue}>
																{getYAxisFormattedValue(
																	`${(timeUnixNano || 0) / 1e6 - startTime}`,
																	'ms',
																)}
															</Typography.Text>
															<Typography.Text className={styles.timestampText}>
																{t('trace_details.events.since_trace_start')}
															</Typography.Text>
														</div>
														<div className={styles.timestampContainer}>
															<Typography.Text className={styles.attributeValue}>
																{getYAxisFormattedValue(
																	`${(timeUnixNano || 0) / 1e6 - span.timestamp}`,
																	'ms',
																)}
															</Typography.Text>
															<Typography.Text className={styles.timestampText}>
																{t('trace_details.events.since_span_start')}
															</Typography.Text>
														</div>
													</div>
													{attributeMap &&
														Object.keys(attributeMap).map((attributeKey) => (
															<EventAttribute
																key={attributeKey}
																attributeKey={attributeKey}
																attributeValue={attributeMap[attributeKey]}
																onExpand={showAttributeModal}
															/>
														))}
												</div>
											),
										},
									]}
								/>
							</div>
						);
					})}
			</div>
			<Modal
				title={modalContent?.title}
				open={!!modalContent}
				onCancel={handleCancel}
				footer={null}
				width="80vw"
				centered
			>
				<pre className={styles.fullView}>{modalContent?.content}</pre>
			</Modal>
		</div>
	);
}

export default EventsTable;
